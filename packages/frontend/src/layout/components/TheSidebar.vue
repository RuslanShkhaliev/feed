<script setup lang="ts">
import { ROUTE_PROFILE, useProfileStore } from '@/modules/profile';
import { ROUTE_FEED } from '@/modules/feed';
import { computed } from 'vue';
import { Skeleton } from 'primevue';
import { ROUTE_FRIENDS } from '@/modules/friends';

const profileStore = useProfileStore();

const isLoading = computed(() => !profileStore.user);
const sidebarNav = computed(() => {
	return [
		{
			to: { name: ROUTE_PROFILE, params: { id: `id${profileStore.user?.id.toFixed(0)}` } },
			text: 'Профиль',
		},
		{
			to: { name: ROUTE_FEED },
			text: 'Лента',
		},
		{
			to: { name: ROUTE_FRIENDS },
			text: 'Друзья',
		},
	];
});
</script>

<template>
	<aside class="py-3 flex flex-col h-full w-[150px] gap-2">
		<template v-if="isLoading">
			<div v-for="link in sidebarNav" :key="link.text" class="flex w-full items-center">
				<Skeleton shape="circle" size="1rem" class="mr-2 shrink-0" />
				<Skeleton animation="wave" width="100%" height="0.5rem" class="shrink-0" />
			</div>
		</template>
		<template v-else>
			<RouterLink
				class="px-1 hover:bg-emerald-50 rounded-l"
				v-for="link in sidebarNav"
				:key="link.text"
				:to="link.to"
			>
				{{ link.text }}
			</RouterLink>
		</template>
	</aside>
</template>
