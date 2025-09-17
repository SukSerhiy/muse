import { ITrack } from './';

export type IAlbum = {
  id: number;
  title?: string | null;
  link?: string | null;
  cover?: string | null;
  cover_small?: string | null;
  cover_medium?: string | null;
  cover_big?: string | null;
  cover_xl?: string | null;
  genre_id?: number;
  release_date?: string;
  artist: {
    id: number;
    name?: string;
  };
  tracks: {
    data: ITrack[];
  };
};
