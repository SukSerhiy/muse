import { DEEZER_API_HOST } from '@/lib/constants';
import { getData } from './utils';
import { endpoints } from './endpoints';
import { ICharts, IAlbum, IArtist, ISearchResults } from '../types';

export const getCharts = () =>
  getData<ICharts>(`${DEEZER_API_HOST}/${endpoints.CHART}`);

export const getAlbum = (id: number) =>
  getData<IAlbum>(`${DEEZER_API_HOST}/${endpoints.ALBUM}/${id}`);

export const getArtist = (id: number) =>
  getData<IArtist>(`${DEEZER_API_HOST}/${endpoints.ARTIST}/${id}`);

export const searchTracks = (q: string) =>
  getData<ISearchResults>(`${DEEZER_API_HOST}/${endpoints.SEARCH}?q=${q}`);
