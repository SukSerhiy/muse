import { Like } from '@prisma/client';

import { Like as LikeValue, Track } from '@/lib/types';

export const mapTracksWithLikes = (tracks: Track[], likes: Like[]): Track[] => {
  return tracks.map((item) => {
    const trackLike = likes.find((l) => l.trackId === item.id);
    let currentLike: LikeValue | null = null;
    if (trackLike) {
      currentLike = trackLike.isDislike ? 'dislike' : 'like';
    }
    return {
      ...item,
      like: currentLike,
    };
  });
};
