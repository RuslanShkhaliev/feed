import { defineStore } from 'pinia';
import { FriendsType } from '@feed/shared/enums';
import { computed, reactive } from 'vue';
import type { PublicUser } from '@feed/shared/models';

export const useFriendsStore = defineStore('friends', () => {
	const friendsStateMap = reactive<Map<PublicUser['id'], PublicUser>>(new Map());

	const friends = computed(() => {
		const dict = Object.values(FriendsType).reduce(
			(acc, key) => {
				Reflect.set(acc, key, []);

				return acc;
			},
			{} as Record<FriendsType, PublicUser[]>,
		);
		Array.from(friendsStateMap.values()).forEach((user) => {
			let status: FriendsType = FriendsType.Recommended;
			if (user.isFollowing && user.isSubscriber) {
				status = FriendsType.All;
			} else if (user.isSubscriber) {
				status = FriendsType.Subscribers;
			} else if (user.isFollowing) {
				status = FriendsType.Following;
			}

			dict[status].push(user);
		});

		return dict;
	});

	const setFriends = (users: PublicUser[]): void => {
		users.forEach((user) => {
			friendsStateMap.set(user.id, user);
		});
	};

	const addFriend = (user: PublicUser): void => {
		friendsStateMap.set(user.id, user);
	};

	const reset = () => {
		friendsStateMap.clear();
	};

	return {
		friendsStateMap,
		friends,
		setFriends,
		addFriend,
		reset,
	};
});
