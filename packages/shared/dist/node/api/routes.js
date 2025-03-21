"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ROUTES = void 0;
exports.API_ROUTES = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        REFRESH: '/auth/refresh',
        LOGOUT: '/auth/logout',
    },
    USERS: {
        ME: '/users/me',
    },
    POSTS: {
        ALL: '/posts',
        ID: '/posts/:id',
        FEED: '/posts/feed',
    },
    FRIENDSHIP: {
        ID: '/friendship/:id',
    },
    PROFILES: {
        ALL: '/profiles',
        ID: '/profiles/:id',
    }
};
//# sourceMappingURL=routes.js.map