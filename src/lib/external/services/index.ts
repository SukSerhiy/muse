import * as api from '../api/index';
import { mapTrack } from '../mappers/trackMapper';

export const getCharts = () =>
  api.getCharts().then((res) => {
    const {
      tracks: { data: tracksData },
    } = res;
    const mappedTracks = tracksData.map((item) => mapTrack(item));
    return {
      ...res,
      tracks: {
        ...res.tracks,
        data: mappedTracks,
      },
    };
  });

export const getAlbum = (id: number) =>
  api.getAlbum(id).then((res) => {
    const {
      tracks: { data: tracksData },
    } = res;
    const mappedTracks = tracksData.map((item) => mapTrack(item));

    return {
      ...res,
      tracks: {
        ...res.tracks,
        data: mappedTracks,
      },
    };
  });

export const getArtist = (id: number) => api.getArtist(id);

export const searchTracks = (q: string) => api.searchTracks(q);
