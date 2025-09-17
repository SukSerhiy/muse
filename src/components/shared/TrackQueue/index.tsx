'use client';
import { FC, useEffect, useRef, useTransition } from 'react';

import { refresh } from '@/app/actions/track.actions';
import { usePlayer } from '@/components/context/PlayerProvider';
import { Button } from '@/components/ui/button';
import { Track as TrackType } from '@/lib/types';

import Track from '../Track';
import { ITrackQueue } from './types';

const TrackQueue: FC<ITrackQueue> = ({ tracks: serverTracks }) => {
  const {
    optimisticTracks,
    setTracks,
    setIsPlaying,
    currentTrackOpts,
    setCurrentTrackOpts,
  } = usePlayer();

  const serverTracksIds = serverTracks.map((item) => item.id);

  const contextTracksIds = optimisticTracks.map((item) => item.id);

  const initializedRef = useRef(false);

  const [isPending, startTransition] = useTransition();

  const trackIdsAreEqual = () => {
    return serverTracksIds.join() === contextTracksIds.join();
  };

  useEffect(() => {
    if (!currentTrackOpts || !serverTracksIds.includes(currentTrackOpts.id))
      return;
    if (contextTracksIds.length === 0 || !trackIdsAreEqual()) {
      setTracks(serverTracks);
      initializedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackOpts, setTracks]);

  useEffect(() => {
    if (initializedRef.current && trackIdsAreEqual()) {
      setTracks(serverTracks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverTracks]);

  const handlePlay = (track: TrackType) => {
    if (currentTrackOpts?.id === track.id) {
      setIsPlaying((prev) => !prev);
    } else {
      setCurrentTrackOpts({
        id: track.id,
        preview: track.preview,
      });
      setIsPlaying(true);
    }
  };

  const refreshPage = () => {
    startTransition(async () => await refresh());
  };

  return (
    <div className="flex flex-col gap-2">
      <Button disabled={isPending} type="button" onClick={refreshPage}>
        Revalidate
      </Button>
      {serverTracks.map((item) => {
        return <Track key={item.id} track={item} onPlay={handlePlay} />;
      })}
    </div>
  );
};

export default TrackQueue;
