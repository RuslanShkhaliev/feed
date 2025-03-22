import type { RouteRecordNormalized } from 'vue-router';
import { PRIVATE_LAYOUT, PUBLIC_LAYOUT } from '@/router/constants.ts';

const checkRoute = (matched: RouteRecordNormalized[], name: string) => {
	return matched.some((route) => route.name === name);
};

export const isPublicRoute = (matched: RouteRecordNormalized[]) =>
	checkRoute(matched, PUBLIC_LAYOUT);
export const isPrivateRoute = (matched: RouteRecordNormalized[]) =>
	checkRoute(matched, PRIVATE_LAYOUT);
