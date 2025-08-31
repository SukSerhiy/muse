"use client";
import { Track, Like } from "@/lib/types/track";
import {
  ReactNode,
  useState,
  createContext,
  useContext,
  useOptimistic,
  Dispatch,
  SetStateAction,
} from "react";

type CurrentTrackOpts = {
  id: bigint;
  preview?: string | null;
}

interface IPlayer {
  tracks: Track[];
  optimisticTracks: Track[];
  setTracks: (tracks: Track[]) => void;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  currentTrackOpts: CurrentTrackOpts | null;
  setCurrentTrackOpts: Dispatch<SetStateAction<CurrentTrackOpts | null>>;
  setLike: (id: bigint, like: Like | null) => void;
}

const defaultValue: IPlayer = {
  tracks: [],
  optimisticTracks: [],
  setTracks: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  currentTrackOpts: null,
  setCurrentTrackOpts: () => {},
  setLike: () => {},
};

const PlayerContext = createContext<IPlayer>(defaultValue);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrackOpts, setCurrentTrackOpts] = useState<CurrentTrackOpts | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [tracks, setTracks] = useState<Track[]>([]);

  const [optimisticTracks, setOptimisticTracks] =
    useOptimistic<Track[]>(tracks);

  console.log("optimisticTracks", optimisticTracks);

  const handleLike = (id: bigint, like: Like | null) => {
    setOptimisticTracks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newLike = item.like === like ? null : like;
          return {
            ...item,
            like: newLike,
          };
        }
        return item;
      }),
    );
  };

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        setTracks,
        optimisticTracks,
        isPlaying,
        setIsPlaying,
        currentTrackOpts,
        setCurrentTrackOpts,
        setLike: handleLike,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
