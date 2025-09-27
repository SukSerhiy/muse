import * as api from '../api/index';
import { mapTrack } from '../mappers/trackMapper';
import { withErrorGuard, withErrorGuardAndMap } from './helpers';

export const getCharts = () =>
  withErrorGuardAndMap(api.getCharts(), (res) => ({
    ...res,
    tracks: {
      ...res.tracks,
      data: res.tracks.data.map(mapTrack),
    },
  }));

export const getAlbum = (id: number) =>
  withErrorGuardAndMap(api.getAlbum(id), (res) => ({
    ...res,
    tracks: {
      ...res.tracks,
      data: res.tracks.data.map(mapTrack),
    },
  }));

export const getArtist = (id: number) => withErrorGuard(api.getArtist(id));

export const getArtistTracks = (id: number) =>
  withErrorGuardAndMap(api.getArtistTracks(id), (res) => ({
    ...res,
    data: res.data.map(mapTrack),
  }));

export const getArtistAlbums = (id: number) =>
  withErrorGuard(api.getArtistAlbums(id));

export const searchTracks = (q: string) => api.searchTracks(q);

export const searchAlbums = (q: string, index?: number, limit?: number) =>
  withErrorGuard(api.searchAlbums(q, { index, limit }));
