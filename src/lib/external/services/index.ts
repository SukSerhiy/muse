import { FetchOptions, PaginationParams } from '@/lib/external/api/types';

import * as api from '../api/index';
import { mapTrack } from '../mappers/trackMapper';
import { withErrorGuard, withErrorGuardAndMap } from './helpers';

export const getCharts = (options?: FetchOptions) =>
  withErrorGuardAndMap(api.getCharts(options), (res) => ({
    ...res,
    tracks: {
      ...res.tracks,
      data: res.tracks.data.map(mapTrack),
    },
  }));

export const getAlbum = (id: number, options?: FetchOptions) =>
  withErrorGuardAndMap(api.getAlbum(id, options), (res) => ({
    ...res,
    tracks: {
      ...res.tracks,
      data: res.tracks.data.map(mapTrack),
    },
  }));

export const getArtist = (id: number, options?: FetchOptions) =>
  withErrorGuard(api.getArtist(id, options));

export const getArtistTracks = (
  id: number,
  pagination?: PaginationParams,
  options?: FetchOptions
) =>
  withErrorGuardAndMap(api.getArtistTracks(id, pagination, options), (res) => ({
    ...res,
    data: res.data.map(mapTrack),
  }));

export const getArtistAlbums = (
  id: number,
  pagination?: PaginationParams,
  options?: FetchOptions
) => withErrorGuard(api.getArtistAlbums(id, pagination, options));

export const searchTracks = (
  q: string,
  pagination?: PaginationParams,
  options?: FetchOptions
) =>
  withErrorGuardAndMap(api.searchTracks(q, pagination, options), (res) => ({
    ...res,
    data: res.data.map(mapTrack),
  }));

export const searchAlbums = (
  q: string,
  pagination?: PaginationParams,
  options?: FetchOptions
) => withErrorGuard(api.searchAlbums(q, pagination, options));
