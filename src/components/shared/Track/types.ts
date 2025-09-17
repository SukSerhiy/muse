import { Track } from '@/lib/types';

export type ITrack = {
  track: Track;
  onPlay: (track: Track) => void;
};
