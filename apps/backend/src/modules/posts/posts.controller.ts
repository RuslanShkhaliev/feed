import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Req,
    UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
    type CreatedPost,
    CreatePostSchema,
    FeedPost,
    Post as PostModel,
} from '@feed/shared/models';
import { ZodValidationPipe } from '@/common/validation/zod.pipe';
import { API_ROUTES } from '@feed/shared/api';

@Controller()
export class PostsController {
    constructor(private postsService: PostsService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post(API_ROUTES.POSTS.ID)
    @UsePipes(new ZodValidationPipe(CreatePostSchema))
    public async createPost(@Req() req, @Body() post: CreatedPost): Promise<PostModel> {
        return this.postsService.createPost(req.user.id, post);
    }
    @HttpCode(HttpStatus.OK)
    @Get(API_ROUTES.POSTS.ALL)
    public async getAllPosts(@Req() req): Promise<PostModel[]> {
        return this.postsService.getAll(req.user.id);
    }

    @HttpCode(HttpStatus.OK)
    @Delete(API_ROUTES.POSTS.ID)
    public async removePost(@Param('id') postId: number, @Req() req): Promise<PostModel> {
        return this.postsService.removePost(req.user.id, postId);
    }

    @HttpCode(HttpStatus.OK)
    @Get(API_ROUTES.POSTS.FEED)
    public async getFeed(@Req() req): Promise<FeedPost[]> {
        return this.postsService.getFeed(req.user.id);
    }
}
