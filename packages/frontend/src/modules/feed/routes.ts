import type { RouteRecordRaw } from 'vue-router';

export const ROUTE_FEED = 'Feed';
export const feedRoutes: RouteRecordRaw[] = [
	{
		path: '/feed',
		name: ROUTE_FEED,
		component: () => import('@/modules/feed/FeedView.vue'),
	},
];
