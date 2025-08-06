export interface ICharts {
  tracks: {
    data: IChartTrack[];
    total: number;
  };
  albums: {
    data: IChartAlbum[];
    total: number;
  };
  artists: {
    data: IChartArtist[];
    total: number
  }
}

export interface IChartTrack {
  id: number;
  title?: string | null;
  title_short?: string | null;
  link?: string | null;
  duration?: number | null; // Duration in seconds
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

export interface IChartAlbum {
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
}

export interface IChartArtist {
  id: number;
  name?: string | null;
  link?: string | null;
  picture?: string | null;
  picture_small?: string | null;
  picture_medium?: string | null;
  picture_big?: string | null;
  picture_xl?: string | null;
}
