import { apiAuth, ROUTE_LOGIN, useAuthStore } from '@/modules/auth';
import { ROUTE_FEED } from '@/modules/feed';
import { router } from '@/router';
import { useProfileStore } from '@/modules/profile';
import { type AuthCredentials, AuthCredentialsSchema, type AuthResponse } from '@feed/shared/models';

const register = async (data: AuthCredentials): Promise<void> => {
	const response = await apiAuth.register(AuthCredentialsSchema.parse(data));
	saveAuth(response);
};

const login = async (data: AuthCredentials): Promise<void> => {
	const response = await apiAuth.login(AuthCredentialsSchema.parse(data));
	saveAuth(response);
};

const logout = async (): Promise<void> => {
	const { removeToken } = useAuthStore();

	await apiAuth.logout().finally(() => {
		router.replace({ name: ROUTE_LOGIN });
	});

	const { setUser } = useProfileStore();
	setUser(null);
	removeToken();
};

const saveAuth = (response: AuthResponse): void => {
	const { login } = useAuthStore();
	const { setUser } = useProfileStore();

	login(response.accessToken);
	setUser(response.user);

	router.replace({ name: ROUTE_FEED });
};

export const authService = {
	register,
	login,
	logout,
};
