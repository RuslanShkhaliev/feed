export const API_ROUTES = {
    AUTH: {
        REGISTER: '/auth/register',
        VERIFY_EMAIL: '/auth/verify-email',
        LOGIN: '/auth/login',
        REFRESH: '/auth/refresh',
        LOGOUT: '/auth/logout',
    },
    EMAIL_CONFIRM: {
        SEND: '/email/send',
        VERIFY: '/email/verify',
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
    },
} as const;
