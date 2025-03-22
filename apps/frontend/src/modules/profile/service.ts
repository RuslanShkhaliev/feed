import { apiProfile } from '@/modules/profile/api.ts';
import { ROUTE_LOGIN, useAuthStore } from '@/modules/auth';
import { useProfileStore } from '@/modules/profile/store.ts';
import { router } from '@/router';
import type { CreatedPost } from '@feed/shared/models';

const getProfile = async (): Promise<void> => {
	const { setUser } = useProfileStore();
	const { reset } = useAuthStore();
	try {
		const user = await apiProfile.getProfile();
		setUser(user);
	} catch (_error) {
		reset();
		await router.replace({ name: ROUTE_LOGIN });
	}
};

const createPost = async (data: CreatedPost): Promise<void> => {
	const { addPost } = useProfileStore();

	const post = await apiProfile.createPost(data);

	addPost(post);
};
const getPosts = async (): Promise<void> => {
	const { setPosts } = useProfileStore();
	const posts = await apiProfile.getPosts();

	setPosts(posts);
};
export const profileService = {
	getProfile,
	createPost,
	getPosts,
};
