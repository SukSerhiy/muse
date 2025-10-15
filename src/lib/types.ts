import { Track as InternalTrack } from '@prisma/client';

export type Like = 'like' | 'dislike';

export type Track = Partial<
  Omit<InternalTrack, 'id' | 'title' | 'createdAt' | 'updatedAt'>
> &
  Pick<InternalTrack, 'title'> & { id: string; like?: Like | null };

export type Gender = 'male' | 'female' | 'other';
