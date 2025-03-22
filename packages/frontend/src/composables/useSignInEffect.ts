import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';
import { profileService } from '@/modules/profile';
import { ROUTE_FEED } from '@/modules/feed';
import { PUBLIC_LAYOUT } from '@/router/constants.ts';
import { useAuthStore } from '@/modules/auth';

export const useSignInEffect = (): void => {
	const router = useRouter();
	const route = useRoute();
	const { isAuthenticated } = useAuthStore();
	onBeforeMount(async () => {
		if (!isAuthenticated) {
			return;
		}
		await profileService.getProfile();
		if (route.matched.some((route) => route.name === PUBLIC_LAYOUT)) {
			router.replace({ name: ROUTE_FEED });
		}
	});
};
