import { IChartTrack } from '@/api/types/charts';

export interface ITrack {
  track: IChartTrack;
  onPlay: (track: IChartTrack) => void;
}
