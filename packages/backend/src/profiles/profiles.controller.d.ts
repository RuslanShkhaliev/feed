import { ProfilesService } from './profiles.service';
import { PublicUser } from '../../../shared/src/models';
declare enum ProfilesQueryType {
    All = "all",
    Recommended = "recommended",
    Subscribers = "subscribers",
    Following = "following"
}
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    getProfiles(req: any, query: ProfilesQueryType): Promise<PublicUser[]>;
    getProfileById(profileId: string, req: any): Promise<PublicUser>;
}
export {};
