import { watch } from 'vue';
import { useAuthStore } from '@/modules/auth/store.ts';
import { useFriendsStore } from '@/modules/friends/store.ts';
import { useProfileStore } from '@/modules/profile';

export const useWatchLogout = () => {
	const authStore = useAuthStore();
	const friendsStore = useFriendsStore();
	const profileStore = useProfileStore();

	watch(
		() => authStore.isAuthenticated,
		(isAuth: boolean) => {
			if (!isAuth) {
				[authStore, friendsStore, profileStore].forEach((store) => { store.reset(); });
			}
		},
		{ immediate: true },
	);
};
