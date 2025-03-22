import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Post, User } from '@feed/shared/models';

export const useProfileStore = defineStore('user', () => {
	const _user = ref<User | null>(null);
	const _posts = ref<Post[]>([]);

	const user = computed<User | null>(() => _user.value);
	const posts = computed<Post[]>(() => _posts.value);

	const setUser = (user: User | null): void => {
		_user.value = user;
	};
	const setPosts = (post: Post[]): void => {
		_posts.value = post;
	};

	const addPost = (post: Post): void => {
		_posts.value.unshift(post);
	};

	const removePost = (index: number): void => {
		_posts.value.splice(index, 1);
	};

	const reset = (): void => {
		setUser(null);
		_posts.value = [];
	};

	return {
		user,
		posts,
		setUser,
		setPosts,
		addPost,
		removePost,
		reset,
	};
});
