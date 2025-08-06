import { DEEZER_API_HOST } from '@/lib/constants';
import { getData } from '@/lib/utils/api';
import { endpoints } from './endpoints';

export const getCharts = () => getData(`${DEEZER_API_HOST}/${endpoints.CHART}`);

export const getAlbum = (id: number) =>
  getData(`${DEEZER_API_HOST}/${endpoints.ALBUM}/${id}`);

export const getArtist = (id: number) =>
  getData(`${DEEZER_API_HOST}/${endpoints.ARTIST}/${id}`);

export const searchTracks = (q: string) =>
  getData(`${DEEZER_API_HOST}/${endpoints.SEARCH}?q=${q}`);
