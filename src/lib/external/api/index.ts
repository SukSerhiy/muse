import { DEEZER_API_HOST } from '@/lib/constants';

import { IAlbum, IArtist, ICharts, ITrack } from '../types';
import { DEFAULT_LIMIT } from './constants';
import {
  artistEndpoints,
  endpoints,
  paginationParams,
  searchEndpoinst,
} from './endpoints';
import { FetchOptions, Paginated, PaginationParams, Response } from './types';
import { getData } from './utils';

const getPaginationQuery = (index: number, limit: number) =>
  `${paginationParams.LIMIT}=${limit}&${paginationParams.INDEX}=${index}`;

function makeSearch<T>(endpoint?: string) {
  return (q: string, pagination?: PaginationParams, options?: FetchOptions) => {
    const { limit = DEFAULT_LIMIT, index = 0 } = pagination || {};
    const url = `${DEEZER_API_HOST}/${endpoints.SEARCH}${endpoint ? `/${endpoint}` : ''}?q=${q}&${getPaginationQuery(index, limit)}`;

    return getData<Response<Paginated<T[]>>>(url, options);
  };
}

function makeById<T>(endpoint: string) {
  return (id: number, options?: FetchOptions) => {
    const url = `${DEEZER_API_HOST}/${endpoint}/${id}`;
    return getData<Response<T>>(url, options);
  };
}

function makePaginatedById<T>(endpoint: string, subEndpoint: string) {
  return (
    id: number,
    pagination?: PaginationParams,
    options?: FetchOptions
  ) => {
    const { limit = DEFAULT_LIMIT, index = 0 } = pagination || {};

    const url = `${DEEZER_API_HOST}/${endpoint}/${id}/${subEndpoint}?${getPaginationQuery(index, limit)}`;

    return getData<Response<Paginated<T[]>>>(url, options);
  };
}

export const getCharts = (options?: FetchOptions) =>
  getData<Response<ICharts>>(`${DEEZER_API_HOST}/${endpoints.CHART}`, options);

export const getAlbum = makeById<IAlbum>(endpoints.ALBUM);

export const getArtist = makeById<IArtist>(endpoints.ARTIST);

export const getArtistTracks = makePaginatedById<ITrack>(
  endpoints.ARTIST,
  artistEndpoints.TOP
);

export const getArtistAlbums = makePaginatedById<IAlbum>(
  endpoints.ARTIST,
  artistEndpoints.ALBUMS
);

export const searchTracks = makeSearch<ITrack>();

export const searchAlbums = makeSearch<IAlbum>(searchEndpoinst.ALBUM);

export const searchArtists = makeSearch<IArtist>(searchEndpoinst.ARTIST);
