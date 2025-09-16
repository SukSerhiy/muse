'use client';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { FC, useOptimistic, useTransition } from 'react';

import { likeTrack } from '@/app/actions/track.actions';
import { usePlayer } from '@/components/context/PlayerProvider';
import LikeButton from '@/components/shared/LikeButton';
import { Button } from '@/components/ui/button';

import { ITrack } from './types';

const Track: FC<ITrack> = ({ track, onPlay }) => {
  const { isPlaying, currentTrackOpts, optimisticTracks, setLike } =
    usePlayer();

  const [, startTransition] = useTransition();

  const isActive = currentTrackOpts?.id === track.id;

  const [optimisticLike, setOptimisticLike] = useOptimistic(track.like);

  const currOptimLike = isActive
    ? optimisticTracks.find((item) => item.id === track.id)?.like
    : optimisticLike;

  const handleLike = (isDislike?: boolean) => {
    startTransition(async () => {
      if (!track) return;
      const newLike = isDislike ? 'dislike' : 'like';
      if (isActive) {
        setLike(track.id, currOptimLike === newLike ? null : newLike);
      } else {
        setOptimisticLike(currOptimLike === newLike ? null : newLike);
      }
      await likeTrack(track, isDislike);
    });
  };

  return (
    <div className="flex items-center gap-3 rounded-xs border-2 p-1.5">
      <Button
        className="rounded-full"
        variant="ghost"
        onClick={() => onPlay(track)}
      >
        {isActive && isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <span>{track.title}</span>
      <div className="ml-auto flex items-center gap-3">
        <LikeButton
          isActive={currOptimLike === 'dislike'}
          isDislike
          onClick={() => handleLike(true)}
        />
        <LikeButton
          isActive={currOptimLike === 'like'}
          onClick={() => handleLike(false)}
        />
      </div>
    </div>
  );
};

export default Track;
