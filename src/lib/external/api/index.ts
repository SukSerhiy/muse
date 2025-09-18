import { DEEZER_API_HOST } from '@/lib/constants';

import { IAlbum, IArtist, ICharts, ISearchResults } from '../types';
import { endpoints } from './endpoints';
import { Response } from './types';
import { getData } from './utils';

export const getCharts = () =>
  getData<Response<ICharts>>(`${DEEZER_API_HOST}/${endpoints.CHART}`);

export const getAlbum = (id: number) =>
  getData<Response<IAlbum>>(`${DEEZER_API_HOST}/${endpoints.ALBUM}/${id}`);

export const getArtist = (id: number) =>
  getData<Response<IArtist>>(`${DEEZER_API_HOST}/${endpoints.ARTIST}/${id}`);

export const searchTracks = (q: string) =>
  getData<Response<ISearchResults>>(
    `${DEEZER_API_HOST}/${endpoints.SEARCH}?q=${q}`
  );
