import { protectedAxiosClient } from '@/http/axiosClient.ts'
import type { FeedPost } from '@feed/shared/models'
import { API_ROUTES } from '@feed/shared/api'

const getFeed = async (): Promise<FeedPost[]> => {
	const { data } = await protectedAxiosClient.get<FeedPost[]>(API_ROUTES.POSTS.FEED)

	return data
}

export const apiFeed = {
	getFeed,
}
