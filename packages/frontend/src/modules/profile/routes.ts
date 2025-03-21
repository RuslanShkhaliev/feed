import type { RouteRecordRaw } from 'vue-router'

export const ROUTE_PROFILE = 'Profile'
export const profileRoutes: RouteRecordRaw[] = [
  {
    path: '/:id',
    name: ROUTE_PROFILE,
    component: () => import('@/modules/profile/ProfileView.vue'),
  },
]
