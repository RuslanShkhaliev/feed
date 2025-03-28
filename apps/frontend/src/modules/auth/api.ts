import { axiosClient, protectedAxiosClient } from '@/http/axiosClient.ts';
import type { AuthCredentials, AuthResponse } from '@feed/shared/models';
import { API_ROUTES } from '@feed/shared/api';

const register = async (authData: AuthCredentials): Promise<AuthResponse> => {
	const { data } = await axiosClient.post<AuthResponse>(API_ROUTES.AUTH.REGISTER, authData);
	return data;
};

const login = async (authData: AuthCredentials): Promise<AuthResponse> => {
	const { data } = await axiosClient.post<AuthResponse>(API_ROUTES.AUTH.LOGIN, authData);
	return data;
};

const logout = async (): Promise<void> => {
	await protectedAxiosClient.get(API_ROUTES.AUTH.LOGOUT);
};

export const apiAuth = {
	login,
	register,
	logout,
};
