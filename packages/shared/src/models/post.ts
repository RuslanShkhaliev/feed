import { z } from 'zod'
import { User } from './user'

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
})

export type CreatedPost = z.infer<typeof CreatePostSchema>;

export type Post = z.infer<typeof PostSchema>;

export interface FeedPost extends Post {
    author: User
}