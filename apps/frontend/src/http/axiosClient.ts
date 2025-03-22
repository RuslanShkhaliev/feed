import { TOKEN_STORAGE_KEY, useAuthStore } from '@/modules/auth/store.ts';
import { useLocalStorage } from '@vueuse/core';
import axios, { AxiosError } from 'axios';
import { AxiosClient } from '@/lib/HttpClient.ts';

const defaultClientOptions = {
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
		Access: 'application/json',
	},
};
// export const httpClient = FetchHttpClient.create({
//   ...httpOptions,
// })

enum HTTP_ERROR {
	UNAUTHORIZED = 401,
}

export const axiosClient = AxiosClient.create({
	...defaultClientOptions,
});

export const protectedAxiosClient = axios.create({
	...defaultClientOptions,
	withCredentials: true,
});

protectedAxiosClient.interceptors.request.use(
	(config) => {
		const token = useLocalStorage(TOKEN_STORAGE_KEY, '');
		if (token) {
			config.headers.set('Authorization', `Bearer ${token.value}`);
		}

		return config;
	},
	(error) => Promise.reject(error),
);

protectedAxiosClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === HTTP_ERROR.UNAUTHORIZED && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const newAccessToken = await refreshAccessToken();

				if (newAccessToken) {
					const token = useLocalStorage(TOKEN_STORAGE_KEY, '');
					token.value = newAccessToken;
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					return protectedAxiosClient.post(originalRequest);
				}
			} catch (err) {
				console.error('Ошибка обновления токена:', err);
			}
		}

		return Promise.reject(error);
	},
);

const refreshAccessToken = async (): Promise<string> => {
	const { setToken, removeToken } = useAuthStore();

	try {
		const { data } = await axiosClient.post<{ accessToken: string }>('/auth/refresh', {
			credentials: 'include',
		});

		setToken(data.accessToken);

		return data.accessToken;
	} catch (err: unknown) {
		removeToken();
		if (err instanceof AxiosError) {
			throw new Error(`Ошибка обновления токена: ${err.message}`);
		} else {
			throw err;
		}
	}
};
