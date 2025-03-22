import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';
import { defineStore } from 'pinia';

export const TOKEN_STORAGE_KEY = 'accessToken';

export const useAuthStore = defineStore(TOKEN_STORAGE_KEY, () => {
	const accessToken = useLocalStorage<string>(TOKEN_STORAGE_KEY, '', {
		listenToStorageChanges: true,
	});

	const token = computed<string>(() => accessToken.value);

	const isAuthenticated = computed<boolean>(() => Boolean(accessToken.value));

	const login = (token: string) => {
		setToken(token);
	};

	const setToken = (token: string): void => {
		accessToken.value = token;
	};

	const removeToken = (): void => {
		accessToken.value = '';
	};

	const reset = () => {
		setToken('');
	};
	return {
		token,
		isAuthenticated,
		login,
		reset,
		setToken,
		removeToken,
	};
});
