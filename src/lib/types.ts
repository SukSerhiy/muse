import { Track as InternalTrack } from '@/lib/generated/prisma/client';

export type Like = 'like' | 'dislike';

export type Track = Partial<
  Omit<InternalTrack, 'id' | 'title' | 'createdAt' | 'updatedAt'>
> &
  Pick<InternalTrack, 'id' | 'title'> & { like?: Like | null };
