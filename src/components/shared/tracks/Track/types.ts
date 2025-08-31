import { Track } from "@/lib/types/track";

export interface ITrack {
  track: Track;
  onPlay: (track: Track) => void;
}
