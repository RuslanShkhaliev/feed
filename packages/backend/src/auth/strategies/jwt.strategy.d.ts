import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { User } from '@feed/shared/models';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate({ sub }: {
        email: string;
        sub: number;
    }): Promise<User>;
}
export {};
