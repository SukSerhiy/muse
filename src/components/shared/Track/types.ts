import { Track } from '@/lib/types/track';

export type ITrack = {
  track: Track;
  onPlay: (track: Track) => void;
}
