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
  artist: {
    id: number;
    name?: string;
  };
  tracks: null;
}

export type IAlbumTrack = {
  id: number;
  title?: string | null;
  preview?: string | null;
  duration?: number | null;
}
