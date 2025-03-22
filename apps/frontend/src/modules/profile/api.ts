import { protectedAxiosClient } from '@/http/axiosClient.ts';
import type { CreatedPost, Post, User } from '@feed/shared/models';
import { API_ROUTES } from '@feed/shared/api';

export const getProfile = async (): Promise<User> => {
	const { data } = await protectedAxiosClient.get<User>(API_ROUTES.USERS.ME);
	return data;
};

export const createPost = async (post: CreatedPost): Promise<Post> => {
	const { data } = await protectedAxiosClient.post<Post>(API_ROUTES.POSTS.ID, post);

	return data;
};
export const deletePost = async (id: number): Promise<Post> => {
	const { data } = await protectedAxiosClient.post<Post>(API_ROUTES.POSTS.ID, { params: { id } });

	return data;
};

export const getPosts = async (): Promise<Post[]> => {
	const { data: posts } = await protectedAxiosClient.get<Post[]>(API_ROUTES.POSTS.ALL);

	return posts;
};

export const apiProfile = {
	getProfile,
	createPost,
	deletePost,
	getPosts,
};
