<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { feedService } from './service.ts';
import type { FeedPost } from '@feed/shared/models';

const feed = ref<FeedPost[]>([]);

onBeforeMount(async () => {
	feed.value = await feedService.getFeed();
});
</script>

<template>
	<div>
		<div v-for="post in feed" :key="post.id">
			<div>{{ post.author.name }}</div>
			<div>
				<div class="flex">
					<img v-for="image in post.images" :key="image" :src="image" class="max-w-full" />
				</div>
				<p>{{ post.content }}</p>
			</div>
			<span>{{ post.createdAt }}</span>
		</div>
	</div>
</template>

<style scoped></style>
