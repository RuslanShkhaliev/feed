import type { RouteRecordRaw } from 'vue-router'

export const ROUTE_REGISTRATION = 'Register'
export const ROUTE_LOGIN = 'Login'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: 'login',
    name: ROUTE_LOGIN,
    component: () => import('@/modules/auth/AuthView.vue'),
  },
  {
    path: 'register',
    name: ROUTE_REGISTRATION,
    component: () => import('@/modules/auth/AuthView.vue'),
  },
]
