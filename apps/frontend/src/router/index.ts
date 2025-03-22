import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes, ROUTE_LOGIN, useAuthStore } from '@/modules/auth';
import { feedRoutes, ROUTE_FEED } from '@/modules/feed';
import { profileRoutes } from '@/modules/profile';
import DefaultLayout from '@/layout/DefaultLayout.vue';
import { PRIVATE_LAYOUT, PUBLIC_LAYOUT } from '@/router/constants.ts';
import { friendRoutes } from '@/modules/friends/routes.ts';
import { isPrivateRoute, isPublicRoute } from '@/router/utils.ts';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/auth',
			name: PUBLIC_LAYOUT,
			redirect: { name: ROUTE_LOGIN },
			children: authRoutes,
			component: () => import('@/modules/auth/AuthLayout.vue'),
		},
		{
			path: '',
			name: PRIVATE_LAYOUT,
			redirect: { name: ROUTE_FEED },
			children: [...profileRoutes, ...feedRoutes, ...friendRoutes],
			component: DefaultLayout,
		},
		{
			path: '/:*',
			redirect: { name: ROUTE_FEED },
		},
	],
});

router.beforeEach(async (to, from, next) => {
	const { isAuthenticated } = useAuthStore();
	if (!isAuthenticated && isPrivateRoute(to.matched)) {
		return next({ name: ROUTE_LOGIN });
	}
	if (isAuthenticated && isPublicRoute(to.matched)) {
		return next({ name: ROUTE_FEED });
	}
	next();
});
