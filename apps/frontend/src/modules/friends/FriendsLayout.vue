<script setup lang="ts">
import { Card } from 'primevue';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import FriendsView from './FriendsView.vue';
import { friendsService } from './service.ts';
import type { User } from '@feed/shared/models';
import { FriendsType } from '@feed/shared/enums';

const route = useRoute();
const router = useRouter();

const routes = {
	[FriendsType.All]: {
		title: 'Ваши друзья',
		link: {
			query: FriendsType.All,
			text: 'Мои друзья',
		},
	},
	[FriendsType.Subscribers]: {
		title: 'Заявки в друзья',
		link: {
			query: FriendsType.Subscribers,
			text: 'Заявки в друзья',
		},
	},
	[FriendsType.Following]: {
		title: 'Мои заявки',
		link: {
			query: FriendsType.Following,
			text: 'Мои заявки',
		},
	},
	[FriendsType.Recommended]: {
		title: 'Рекомендованные друзья',
		link: {
			query: FriendsType.Recommended,
			text: 'Рекомендованные',
		},
	},
};

const activeTab = computed<FriendsType>(
	() => (route.query.section as FriendsType) || FriendsType.All,
);

onMounted(async () => {
	await router.replace({ query: { section: activeTab.value } });
});

const friends = ref<User[]>([]);

watch(
	activeTab,
	async (tab) => {
		await friendsService.getFriends(tab);
	},
	{ immediate: true },
);
</script>

<template>
	<div class="flex gap-4">
		<FriendsView
			class="grow"
			:friends="friends"
			:viewType="activeTab"
			:title="routes[activeTab].title"
		/>
		<Card
			:pt="{
				content: 'flex flex-col gap-3',
			}"
			class="flex flex-col gap-3 sticky top-0"
		>
			<template #content>
				<RouterLink
					v-for="(tab, key) in routes"
					:key="key"
					:to="{ query: { section: tab.link.query } }"
				>
					{{ tab.link.text }}
				</RouterLink>
			</template>
		</Card>
	</div>
</template>
