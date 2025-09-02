import { Track as InternalTrack } from '@/lib/types/track';

import { ITrack as ExternalTrack } from '../types';

export const mapTrack: (t: ExternalTrack) => InternalTrack = (t) => {
  return {
    id: BigInt(t.id),
    title: t.title || '',
    coverSmall: t.album.cover_small,
    coverBig: t.album.cover_big,
    preview: t.preview,
    artistSourceId: t.artist.id,
    artistName: t.artist.name,
    albumSourceId: t.album.id,
    albumTitle: t.album.title,
  };
};
