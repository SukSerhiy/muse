'use client'
import { FC } from 'react';
import { PlayIcon, PauseIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlayer } from "@/components/context/PlayerProvider";
import { ITrack } from './types';

const Track: FC<ITrack> = ({ track, onPlay }) => {
  const {
    tracks,
    setTracks,
    isPlaying,
    setIsPlaying,
    currentTrackId,
    setCurrentTrackId,
  } = usePlayer();

  const isActive = currentTrackId === track.id && isPlaying;

  return (
    <div className="flex items-center gap-3 border-2 rounded-xs p-1.5">
      <Button className="rounded-full" variant="ghost" onClick={() => onPlay(track)}>
        {isActive ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <span>{track.title}</span>
      <div className="ml-auto">
        
      </div>
    </div>
  );
};

export default Track;
