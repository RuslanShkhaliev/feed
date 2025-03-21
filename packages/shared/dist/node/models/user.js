"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
});
//# sourceMappingURL=user.js.map