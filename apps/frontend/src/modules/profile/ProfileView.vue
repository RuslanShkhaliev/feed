<script setup lang="ts">
import { Button, Skeleton, Textarea } from 'primevue';
import { Form } from '@primevue/forms';
import { computed, ref } from 'vue';
import { profileService } from './service.ts';
import { useProfileStore } from './store.ts';
import { useAsyncState } from '@vueuse/core';
import { CreatePostSchema } from '@feed/shared/models';

const profileStore = useProfileStore();
const post = ref('');
const posts = computed(() => profileStore.posts);
const startCreating = () => {
	isCreating.value = true;
};
// TODO: добавить функционал черновик
const createPost = async (): Promise<void> => {
	await profileService.createPost(
		CreatePostSchema.parse({
			content: post.value,
			images: [],
		}),
	);
	post.value = '';
	isCreating.value = false;
};
const isCreating = ref(false);

const { isLoading: postLoading } = useAsyncState(profileService.getPosts(), null, {
	immediate: true,
	onError: (e) => console.error(e),
});
</script>

<template>
	<div class="flex flex-col gap-4">
		<Button @click="startCreating"> Создать пост </Button>
		<Form @submit="createPost" v-if="isCreating" class="flex flex-col gap-4">
			<Textarea v-model="post"></Textarea>
			<Button type="submit">Опубликовать</Button>
		</Form>

		<div>
			<div class="flex flex-col gap-3" v-if="postLoading">
				<div v-for="n in 5" :key="n" class="flex flex-col gap-1">
					<Skeleton height="1rem" />
					<Skeleton height="150px"></Skeleton>
				</div>
			</div>
			<template v-else>
				<div v-for="post in posts" :key="post.id">
					<p>
						{{ post.content }}
					</p>
					<span>{{ post.createdAt }}</span>
				</div>
			</template>
		</div>
	</div>
</template>

<style scoped></style>
