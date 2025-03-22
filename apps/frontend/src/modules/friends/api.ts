import { protectedAxiosClient } from '@/http/axiosClient.ts';
import type { PublicUser } from '@feed/shared/models';
import { API_ROUTES } from '@feed/shared/api';
import { formatRoute } from '@/utils';
import { FriendsType } from '@feed/shared/enums';

const followUser = async (id: number): Promise<PublicUser> => {
	const { data } = await protectedAxiosClient.post<PublicUser>(
		formatRoute(API_ROUTES.FRIENDSHIP.ID, { id }),
	);

	return data;
};

const unfollowUser = async (id: number): Promise<PublicUser> => {
	const { data } = await protectedAxiosClient.delete<PublicUser>(
		formatRoute(API_ROUTES.FRIENDSHIP.ID, { id }),
	);

	return data;
};

const getFriends = async (section: FriendsType): Promise<PublicUser[]> => {
	const { data } = await protectedAxiosClient.get<PublicUser[]>(API_ROUTES.PROFILES.ALL, {
		params: { section },
	});

	return data;
};

const getUserById = async (id: number): Promise<PublicUser> => {
	const { data } = await protectedAxiosClient.get<PublicUser>(
		formatRoute(API_ROUTES.PROFILES.ID, { id }),
	);

	return data;
};

export const apiFriends = {
	followUser,
	unfollowUser,
	getFriends,
	getFriendById: getUserById,
};
