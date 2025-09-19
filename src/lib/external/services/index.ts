import { isError } from '@/lib/external/api/types';

import * as api from '../api/index';
import { mapTrack } from '../mappers/trackMapper';

export const getCharts = () =>
  api.getCharts().then((res) => {
    if (isError(res)) {
      throw new Error(res.error.message);
    }
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
    if (isError(res)) {
      throw new Error(res.error.message);
    }
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

export const getArtist = (id: number) =>
  api.getArtist(id).then((res) => {
    if (isError(res)) {
      throw new Error(res.error.message);
    }
    return res;
  });

export const getArtistTracks = (id: number) =>
  api.getArtistTracks(id).then((res) => {
    if (isError(res)) {
      throw new Error(res.error.message);
    }
    const { data: tracks } = res;
    const mappedTracks = tracks.map((item) => mapTrack(item));
    return {
      ...res,
      data: mappedTracks,
    };
  });

export const getArtistAlbums = (id: number) =>
  api.getArtistAlbums(id).then((res) => {
    if (isError(res)) {
      throw new Error(res.error.message);
    }
    return res;
  });

export const searchTracks = (q: string) => api.searchTracks(q);
