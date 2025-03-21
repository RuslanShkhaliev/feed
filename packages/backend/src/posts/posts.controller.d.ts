import { PostsService } from './posts.service';
import { CreatedPost, FeedPost, Post as PostModel } from '../../../shared/src/models';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    createPost(req: any, post: CreatedPost): Promise<PostModel>;
    getAllPosts(req: any): Promise<PostModel[]>;
    removePost(postId: number, req: any): Promise<PostModel>;
    getFeed(req: any): Promise<FeedPost[]>;
}
