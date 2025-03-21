<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import { apiFriends } from './api.ts'
import type { PublicUser } from '@feed/shared/models'

const route = useRoute()

const profileData = ref<PublicUser | null>(null)

onBeforeMount(async () => {
	profileData.value = await apiFriends.getFriendById(Number(route.params.id))
})
</script>

<template>
	<div>
		<template v-if="profileData">
			<div class="flex flex-col gap-3">
				<span>{{ profileData.name }}</span>
				<span>{{ profileData.email }}</span>
			</div>
			<div>
				<h2>Posts</h2>
				<div
					class="flex flex-col gap-3 border border-solid border-cyan-300"
					v-for="post in profileData.posts"
					:key="post.id"
				>
					<span>{{ post.id }}</span>
					<span>{{ post.content }}</span>
				</div>
			</div>
		</template>
	</div>
</template>
