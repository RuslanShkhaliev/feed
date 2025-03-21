"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = exports.CreatePostSchema = void 0;
const zod_1 = require("zod");
exports.CreatePostSchema = zod_1.z.object({
    content: zod_1.z.string().default(''),
    images: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.PostSchema = exports.CreatePostSchema.extend({
    id: zod_1.z.number().int(),
    authorId: zod_1.z.number().int(),
    published: zod_1.z.boolean().default(false),
    likes: zod_1.z.number().int().default(0),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
//# sourceMappingURL=post.js.map