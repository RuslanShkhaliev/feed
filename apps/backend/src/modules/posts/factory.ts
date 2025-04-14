import { Post, PostSchema } from '@feed/shared/models';
import { Post as PostModel } from '@prisma/client';

export const createPost = (post: PostModel): Post => PostSchema.parse(post);
