import { z } from 'zod';
export const CreatePostSchema = z.object({
    content: z.string().default(''),
    images: z.array(z.string()).default([]),
});
export const PostSchema = CreatePostSchema.extend({
    id: z.number().int(),
    authorId: z.number().int(),
    published: z.boolean().default(false),
    likes: z.number().int().default(0),
    createdAt: z.date(),
    updatedAt: z.date(),
});
//# sourceMappingURL=post.js.map