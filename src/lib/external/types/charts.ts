import { ITrack } from './';

export type ICharts = {
  tracks: {
    data: ITrack[];
    total: number;
  };
  albums: {
    data: IChartAlbum[];
    total: number;
  };
  artists: {
    data: IChartArtist[];
    total: number;
  };
};

export type IChartAlbum = {
  id: number;
  title?: string | null;
  link?: string | null;
  cover?: string | null;
  cover_small?: string | null;
  cover_medium?: string | null;
  cover_big?: string | null;
  cover_xl?: string | null;
  explicit_lyrics?: boolean | null;
  artist: {
    id: number;
    name?: string | null;
  };
};

export type IChartArtist = {
  id: number;
  name?: string | null;
  link?: string | null;
  picture?: string | null;
  picture_small?: string | null;
  picture_medium?: string | null;
  picture_big?: string | null;
  picture_xl?: string | null;
};
