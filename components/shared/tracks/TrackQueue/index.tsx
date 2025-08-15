"use client";
import { FC } from "react";
import { usePlayer } from "@/components/context/PlayerProvider";
import { IAlbumTrack } from "@/api/types/album";
import Track from "../Track";
import { ITrackQueue } from "./types";

const TrackQueue: FC<ITrackQueue> = ({ tracks }) => {
  const {
    tracks: contextTracks,
    setIsPlaying,
    setTracks,
    currentTrackId,
    setCurrentTrackId,
  } = usePlayer();

  const handlePlay = (track: IAlbumTrack) => {
    if (currentTrackId === track.id) {
      setIsPlaying((prev) => !prev);
    } else {
      setCurrentTrackId(track.id);
      setIsPlaying(true);
    }
    if ((!contextTracks || contextTracks.length === 0) && tracks.length > 0) {
      setTracks(tracks);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {tracks.map((item) => {
        return <Track key={item.id} track={item} onPlay={handlePlay} />;
      })}
    </div>
  );
};

export default TrackQueue;
