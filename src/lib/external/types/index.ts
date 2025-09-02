import type { IAlbum } from './album';
import type { IArtist } from './artist';
import type { ICharts } from './charts';
import type { ISearchResults } from './search';

export type ITrack = {
  id: number;
  title?: string | null;
  title_short?: string | null;
  link?: string | null;
  duration?: number | null;
  explicit_lyrics?: boolean | null;
  preview?: string | null;
  position?: number | null;
  artist: {
    id: number;
    name?: string | null;
  };
  album: {
    id: number;
    title?: string | null;
    cover?: string | null;
    cover_small?: string | null;
    cover_medium?: string | null;
    cover_big?: string | null;
    cover_xl?: string | null;
  };
}

export type { ICharts, IAlbum, IArtist, ISearchResults };
