import { DEEZER_API_HOST } from '@/lib/constants';

import { IAlbum, IArtist, ICharts, ISearchResults, ITrack } from '../types';
import { DEFAULT_LIMIT } from './constants';
import { artistEndpoints, endpoints, paginationParams } from './endpoints';
import { Paginated, PaginationParams, Response } from './types';
import { getData } from './utils';

export const getCharts = () =>
  getData<Response<ICharts>>(`${DEEZER_API_HOST}/${endpoints.CHART}`);

export const getAlbum = (id: number) =>
  getData<Response<IAlbum>>(`${DEEZER_API_HOST}/${endpoints.ALBUM}/${id}`);

export const getArtist = (id: number) =>
  getData<Response<IArtist>>(`${DEEZER_API_HOST}/${endpoints.ARTIST}/${id}`);

export const getArtistTracks = (id: number, pagination?: PaginationParams) => {
  const { limit = DEFAULT_LIMIT, index = 0 } = pagination || {};
  return getData<Response<Paginated<ITrack[]>>>(
    `${DEEZER_API_HOST}/${endpoints.ARTIST}/${id}/${artistEndpoints.TOP}?${paginationParams.LIMIT}=${limit}&${paginationParams.INDEX}=${index}`
  );
};

export const getArtistAlbums = (id: number, pagination?: PaginationParams) => {
  const { limit = DEFAULT_LIMIT, index = 0 } = pagination || {};
  return getData<Response<Paginated<IAlbum[]>>>(
    `${DEEZER_API_HOST}/${endpoints.ARTIST}/${id}/${artistEndpoints.ALBUMS}?${paginationParams.LIMIT}=${limit}&${paginationParams.INDEX}=${index}`
  );
};

export const searchTracks = (q: string) =>
  getData<Response<ISearchResults>>(
    `${DEEZER_API_HOST}/${endpoints.SEARCH}?q=${q}`
  );
