export declare const API_ROUTES: {
    readonly AUTH: {
        readonly REGISTER: "/auth/register";
        readonly LOGIN: "/auth/login";
        readonly REFRESH: "/auth/refresh";
        readonly LOGOUT: "/auth/logout";
    };
    readonly USERS: {
        readonly ME: "/users/me";
    };
    readonly POSTS: {
        readonly ALL: "/posts";
        readonly ID: "/posts/:id";
        readonly FEED: "/posts/feed";
    };
    readonly FRIENDSHIP: {
        readonly ID: "/friendship/:id";
    };
    readonly PROFILES: {
        readonly ALL: "/profiles";
        readonly ID: "/profiles/:id";
    };
};
