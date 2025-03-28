import { createModuleWithPrisma, FactoryEntityMock } from '@test/factories';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users';
import { UserSchema } from '@feed/shared/models';
import bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt');

describe('AuthService', () => {
    let usersService: jest.Mocked<UsersService>;
    let jwtService: jest.Mocked<JwtService>;
    let service: AuthService;

    beforeEach(async () => {
        const { module } = await createModuleWithPrisma({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        findByEmail: jest.fn(),
                        findById: jest.fn(),
                        createUser: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        verify: jest.fn(),
                        sign: jest.fn(),
                    },
                },
            ],
        });

        service = module.get(AuthService);
        usersService = module.get(UsersService);
        jwtService = module.get(JwtService);
    });

    const mockToken = 'token';
    const mockUser = FactoryEntityMock.createUser();

    const userDto = UserSchema.parse(mockUser);

    describe('register', () => {
        it('should register new user', async () => {
            usersService.createUser.mockReturnValue(Promise.resolve(mockUser));
            jwtService.sign.mockReturnValue(mockToken);
            const authResponse = await service.register({
                email: mockUser.email,
                password: mockUser.password,
            });

            expect(authResponse).toEqual({
                user: mockUser,
                accessToken: mockToken,
                refreshToken: mockToken,
            });
        });
    });

    describe('login', () => {
        it('should return tokens for valid email', async () => {
            usersService.findByEmail.mockResolvedValue(mockUser);
            jwtService.sign.mockReturnValue(mockToken);

            const authResponse = await service.login(mockUser.email);

            expect(authResponse).toEqual({
                user: userDto,
                accessToken: mockToken,
                refreshToken: mockToken,
            });
        });
    });

    describe('validateUser', () => {
        it('should return user by valid id', async () => {
            usersService.findById.mockResolvedValue(userDto);

            const user = await service.validateUserById(mockUser.id);

            expect(user).toEqual(userDto);
        });
        it('should throw error if id is invalid', async () => {
            usersService.findById.mockRejectedValue(new NotFoundException());

            await expect(service.validateUserById(mockUser.id)).rejects.toThrow(NotFoundException);
        });
    });

    describe('validateUser', () => {
        it('should return user for valid email and password', async () => {
            usersService.findByEmail.mockResolvedValue(mockUser);
            jwtService.sign.mockReturnValue(mockToken);
            (bcrypt.compare as jest.Mock).mockReturnValue(true);

            const user = await service.validateUser(mockUser.email, mockUser.password);

            expect(user).toEqual(userDto);
        });

        it('should throw error for invalid email', async () => {
            usersService.findByEmail.mockResolvedValue(Promise.reject(new UnauthorizedException()));
            jwtService.sign.mockReturnValue(mockToken);
            (bcrypt.compare as jest.Mock).mockReturnValue(true);

            await expect(service.validateUser(mockUser.email, mockUser.password)).rejects.toThrow(
                UnauthorizedException,
            );
        });
        it('should throw error for invalid password', async () => {
            usersService.findByEmail.mockResolvedValue(Promise.reject(new UnauthorizedException()));
            jwtService.sign.mockReturnValue(mockToken);
            (bcrypt.compare as jest.Mock).mockReturnValue(false);

            await expect(service.validateUser(mockUser.email, mockUser.password)).rejects.toThrow(
                UnauthorizedException,
            );
        });
    });

    describe('refreshToken', () => {
        it('should update token by refreshToken', async () => {
            usersService.findById.mockResolvedValue(userDto);
            jwtService.verify.mockReturnValue({ sub: mockUser.id });
            jwtService.sign.mockReturnValue(mockToken);

            const token = await service.refreshToken(mockToken);

            expect(token).toEqual(mockToken);
        });

        it('should throw error for invalid refreshToken', async () => {
            jwtService.verify.mockImplementation(() => new Error());

            await expect(service.refreshToken('invalid.refreshToken')).rejects.toThrow(
                UnauthorizedException,
            );
            await expect(service.refreshToken('')).rejects.toThrow(UnauthorizedException);
        });
    });
});
