export type ISearchResults = {
  data: ISearchTrack[];
  total: number;
}

export type ISearchTrack = {
  id: number;
  title?: string | null;
  artist: {
    id: number;
    name?: string | null;
  }
  album: {
    id: number;
    title?: string | null;
  }
}
