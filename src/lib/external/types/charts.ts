import { IAlbum, IArtist, ITrack } from './';

export type ICharts = {
  tracks: {
    data: ITrack[];
    total: number;
  };
  albums: {
    data: IAlbum[];
    total: number;
  };
  artists: {
    data: IArtist[];
    total: number;
  };
};
