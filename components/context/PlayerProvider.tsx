"use client";
import { IChartTrack } from "@/api/types/charts";
import {
  ReactNode,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface IPlayer {
  tracks: IChartTrack[];
  setTracks: Dispatch<SetStateAction<IChartTrack[]>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  currentTrackId: number | null;
  setCurrentTrackId: Dispatch<SetStateAction<number | null>>;
}

const defaultValue: IPlayer = {
  tracks: [],
  setTracks: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  currentTrackId: null,
  setCurrentTrackId: () => {},
};

const PlayerContext = createContext<IPlayer>(defaultValue);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [tracks, setTracks] = useState<IChartTrack[]>([]);
  const [currentTrackId, setCurrentTrackId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        setTracks,
        isPlaying,
        setIsPlaying,
        currentTrackId,
        setCurrentTrackId,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
