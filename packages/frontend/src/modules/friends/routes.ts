import type { RouteRecordRaw } from 'vue-router'

export const ROUTE_FRIENDS = 'Friends'
export const ROUTE_FRIENDS_MY = 'FriendsMy'
export const ROUTE_USER_PROFILE = 'UserProfile'
export const ROUTE_FRIENDS_RECOMMENDED = 'FriendsRecommended'
export const friendRoutes: RouteRecordRaw[] = [
  {
    path: '/friends',
    name: ROUTE_FRIENDS,
    component: () => import('@/modules/friends/FriendsLayout.vue'),
  },
  {
    path: '/profile/:id',
    name: ROUTE_USER_PROFILE,
    component: () => import('@/modules/friends/UserProfile.vue'),
  },
]
