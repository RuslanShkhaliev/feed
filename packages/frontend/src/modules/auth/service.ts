import { useAuthStore } from '@/modules/auth/store.ts'
import { ROUTE_FEED } from '@/modules/feed'
import { ROUTE_LOGIN } from '@/modules/auth/routes.ts'
import { router } from '@/router'
import { useProfileStore } from '@/modules/profile/store.ts'
import { type AuthCredentials, AuthCredentialsSchema, type AuthResponse } from '@feed/shared/models'
import { apiAuth } from '@/modules/auth/api.ts'

const register = async (data: AuthCredentials): Promise<void> => {
	const response = await apiAuth.register(AuthCredentialsSchema.parse(data))
	saveAuth(response)
}

const login = async (data: AuthCredentials): Promise<void> => {
	const response = await apiAuth.login(AuthCredentialsSchema.parse(data))
	saveAuth(response)
}

const logout = async (): Promise<void> => {
	const { removeToken } = useAuthStore()

	await apiAuth.logout().finally(() => {
		router.replace({ name: ROUTE_LOGIN })
	})

	const { setUser } = useProfileStore()
	setUser(null)
	removeToken()
}

const saveAuth = (response: AuthResponse): void => {
	const { login } = useAuthStore()
	const { setUser } = useProfileStore()

	login(response.accessToken)
	setUser(response.user)

	router.replace({ name: ROUTE_FEED })
}

export const authService = {
	register,
	login,
	logout,
}
