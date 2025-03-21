import { UsersService } from './users.service';
import { User } from '../../../shared/src/models';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserProfile(req: any): Promise<User>;
}
