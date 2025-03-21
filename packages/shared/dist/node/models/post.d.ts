import { z } from 'zod';
import { User } from './user';
export declare const CreatePostSchema: z.ZodObject<{
    content: z.ZodDefault<z.ZodString>;
    images: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    content: string;
    images: string[];
}, {
    content?: string | undefined;
    images?: string[] | undefined;
}>;
export declare const PostSchema: z.ZodObject<z.objectUtil.extendShape<{
    content: z.ZodDefault<z.ZodString>;
    images: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, {
    id: z.ZodNumber;
    authorId: z.ZodNumber;
    published: z.ZodDefault<z.ZodBoolean>;
    likes: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}>, "strip", z.ZodTypeAny, {
    id: number;
    content: string;
    images: string[];
    authorId: number;
    published: boolean;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}, {
    id: number;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    content?: string | undefined;
    images?: string[] | undefined;
    published?: boolean | undefined;
    likes?: number | undefined;
}>;
export type CreatedPost = z.infer<typeof CreatePostSchema>;
export type Post = z.infer<typeof PostSchema>;
export interface FeedPost extends Post {
    author: User;
}
