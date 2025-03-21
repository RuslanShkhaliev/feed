"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublicUser = void 0;
const createPublicUser = (user, isSubscriber, isFollowing) => ({
    ...user,
    isSubscriber,
    isFollowing,
});
exports.createPublicUser = createPublicUser;
//# sourceMappingURL=createPublicUser.js.map