import { apiFriends } from '@/modules/friends/api.ts'
import { useFriendsStore } from '@/modules/friends/store.ts'
import type { PublicUser } from '@feed/shared/models'
import { FriendsType } from '@feed/shared/enums'

const followUser = async (id: number): Promise<void> => {
	const { addFriend } = useFriendsStore()
	const user = await apiFriends.followUser(id)

	addFriend(user)
}

const unfollowUser = async (id: number): Promise<void> => {
	const { addFriend } = useFriendsStore()
	const user = await apiFriends.unfollowUser(id)

	addFriend(user)
}

const getFriends = async (section: FriendsType): Promise<void> => {
	const { setFriends } = useFriendsStore()
	const friends = await apiFriends.getFriends(section)

	setFriends(friends)
}

const getProfileById = async (id: number): Promise<PublicUser> => {
	return apiFriends.getFriendById(id)
}

export const friendsService = {
	followUser,
	unfollowUser,
	getFriends,
	getProfileById,
}
