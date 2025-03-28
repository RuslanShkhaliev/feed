import { apiFeed } from '@/modules/feed/api.ts';
import type { FeedPost } from '@feed/shared/models';

const getFeed = async (): Promise<FeedPost[]> => {
	return apiFeed.getFeed();
};

export const feedService = {
	getFeed,
};
