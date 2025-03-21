"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCredentialsSchema = void 0;
const zod_1 = require("zod");
exports.AuthCredentialsSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3, 'Пароль должен быть минимум 3 символа'),
});
//# sourceMappingURL=auth.js.map