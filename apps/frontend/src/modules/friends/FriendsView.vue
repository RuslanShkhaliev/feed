<script setup lang="ts">
import { ROUTE_USER_PROFILE } from './routes.ts';
import { FriendsType } from '@feed/shared/enums';
import { Button } from 'primevue';
import { friendsService } from './service.ts';
import { useFriendsStore } from './store.ts';
import { computed } from 'vue';
import type { PublicUser } from '@feed/shared/models';

const props = defineProps<{
	viewType: FriendsType;
	title: string;
}>();

const actions = {
	[FriendsType.All]: {
		text: 'Удалить из друзей',
		action: async (id: number) => {
			await friendsService.unfollowUser(id);
		},
	},
	[FriendsType.Following]: {
		text: 'Отписаться',
		action: async (id: number) => {
			await friendsService.unfollowUser(id);
		},
	},
	[FriendsType.Subscribers]: {
		text: 'Подписаться',
		action: async (id: number) => {
			await friendsService.followUser(id);
		},
	},
	[FriendsType.Recommended]: {
		text: 'Подписаться',
		action: async (id: number) => {
			await friendsService.followUser(id);
		},
	},
};

const friendsStore = useFriendsStore();

const friends = computed<PublicUser[]>(() => friendsStore.friends[props.viewType]);
</script>

<template>
	<div>
		<h1 class="text-2xl">{{ title }}</h1>
		<div>
			<div v-for="friend in friends" :key="friend.id">
				<RouterLink :to="{ name: ROUTE_USER_PROFILE, params: { id: friend.id } }">
					<p>{{ friend.name }}</p>
					<p>{{ friend.email }}</p>
				</RouterLink>
				<Button @click.stop="actions[viewType].action(friend.id)">{{
					actions[viewType].text
				}}</Button>
			</div>
		</div>
	</div>
</template>
