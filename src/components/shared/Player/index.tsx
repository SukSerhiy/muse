'use client';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

import { likeTrack } from '@/app/actions/track.actions';
import { usePlayer } from '@/components/context/PlayerProvider';
import LikeButton from '@/components/shared/LikeButton';
import { Slider } from '@/components/ui/slider';
import { formatTime } from '@/lib/utils/time';

import PlayButtons from './PlayButtons';

const Player = () => {
  const {
    tracks,
    isPlaying,
    setIsPlaying,
    currentTrackOpts,
    setCurrentTrackOpts,
    setLike,
    optimisticTracks,
  } = usePlayer();

  const [dragProgress, setDragProgress] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);

  const [, startTransition] = useTransition();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const savedVolumeRef = useRef<number>(1);

  const currentTrack = optimisticTracks.find(
    (item) => item.id === currentTrackOpts?.id
  );

  const { preview: audioSrc } = currentTrackOpts || {};

  const currentTrackIdx = optimisticTracks.findIndex(
    (item) => item.id === currentTrackOpts?.id
  );

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  const updateProgress = useCallback(() => {
    if (audioRef.current && isPlaying) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      setCurrentTime(current);
      setProgress((current / total) * 100);
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, [isPlaying]);

  const handleNextTrack = () => {
    if (currentTrackIdx == null) return;
    const nextTrackIdx = (currentTrackIdx + 1) % tracks.length;
    const nextTrack = tracks?.[nextTrackIdx];
    setCurrentTrackOpts({
      id: nextTrack.id,
      preview: nextTrack.preview,
    });
  };

  const handlePrevTrack = () => {
    if (currentTrackIdx == null) return;
    const prevTrackIdx =
      currentTrackIdx === 0 ? tracks.length - 1 : currentTrackIdx - 1;
    const prevTrack = tracks?.[prevTrackIdx];
    setCurrentTrackOpts({
      id: prevTrack.id,
      preview: prevTrack.preview,
    });
  };

  const handleLike = (isDislike?: boolean) => {
    startTransition(async () => {
      if (!currentTrack) return;
      const newLike = isDislike ? 'dislike' : 'like';
      setLike(currentTrack.id, currentTrack.like === newLike ? null : newLike);
      await likeTrack(currentTrack, isDislike);
    });
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = audioSrc || '';
      audioRef.current.load();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
    }
  }, [audioSrc]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.volume = volume;
      audioRef.current.play();
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    } else {
      audioRef.current.pause();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, updateProgress, volume, currentTrackOpts]);

  const getVolumeIcon = () => {
    if (volume === 0) {
      return <VolumeX />;
    }
    if (volume <= 0.33333) {
      return <Volume />;
    }
    if (volume < 0.66666) {
      return <Volume1 />;
    }
    if (volume >= 0.66666) {
      return <Volume2 />;
    }
  };

  if (!currentTrackOpts) return null;

  return (
    <div className="my-30">
      <div className="bg-secondary fixed bottom-0 z-30 mt-6 -mr-1 flex h-20 w-full border-t-1 px-7 md:-mr-3">
        <div className="absolute w-full -translate-y-1/2 transform">
          <Slider
            value={[dragProgress !== null ? dragProgress : progress]}
            max={100}
            step={0.1}
            className="w-full cursor-pointer"
            onValueChange={(value) => {
              if (!audioRef.current) return;
              if (dragProgress === null) {
                savedVolumeRef.current = audioRef.current.volume;
              }
              audioRef.current.volume = volume / 2;
              setDragProgress(value[0]);
            }}
            onValueCommit={(value) => {
              if (!audioRef.current || !isFinite(audioRef.current.duration))
                return;
              const newTime = (value[0] / 100) * audioRef.current.duration;
              audioRef.current.volume = savedVolumeRef.current;
              audioRef.current.currentTime = newTime;
              setCurrentTime(newTime);
              setProgress(value[0]);
              setDragProgress(null);
            }}
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <PlayButtons
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onNext={handleNextTrack}
              onPrev={handlePrevTrack}
            />
            <div></div>
            <span className="text-sm">{formatTime(currentTime)} / 0:29</span>
          </div>
          {currentTrack && (
            <div className="flex items-center gap-2">
              {currentTrack?.coverSmall && (
                <Image
                  src={currentTrack?.coverSmall}
                  width={46}
                  height={46}
                  alt="cover"
                  className="rounded-xs"
                />
              )}

              <div className="flex flex-col justify-center gap-0">
                <span className="text-lg">{currentTrack?.title}</span>
                <div className="space-x-1.5 text-[0.9rem]">
                  <Link href={`/artist/${currentTrack?.artistSourceId}`}>
                    {currentTrack?.artistName}
                  </Link>
                  <span>•</span>
                  <Link href={`/album/${currentTrack?.albumSourceId}`}>
                    {currentTrack?.albumTitle}
                  </Link>
                </div>
              </div>
              <LikeButton
                isActive={currentTrack?.like === 'dislike'}
                isDislike
                onClick={() => handleLike(true)}
              />
              <LikeButton
                isActive={currentTrack?.like === 'like'}
                onClick={() => handleLike(false)}
              />
            </div>
          )}
          <div className="flex w-40 items-center gap-2">
            <span>{getVolumeIcon()}</span>
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={(value) => {
                const newVolume = value[0] / 100;
                setVolume(newVolume);
                if (audioRef.current) {
                  audioRef.current.volume = newVolume;
                }
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </div>
  );
};

export default Player;
