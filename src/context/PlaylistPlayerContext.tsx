import React, { createContext } from "react";

type Repeat = "none" | "all" | "one";

type DispatchFunction<T> = React.Dispatch<React.SetStateAction<T>>;

// Define the shape of the context value
export type PlaylistPlayerContextValue = {
  isPlaying: boolean;
  setIsPlaying: DispatchFunction<boolean>;
  currentTime: number;
  setCurrentTime: DispatchFunction<number>;
  duration: number;
  setDuration: DispatchFunction<number>;
  currentTrackIndex: number;
  setCurrentTrackIndex: DispatchFunction<number>;
  shuffle: boolean;
  setShuffle: DispatchFunction<boolean>;
  repeat: Repeat;
  setRepeat: DispatchFunction<Repeat>;
  togglePlayPause: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  play: () => void;
  pause: () => void;
};

export const DEFAULT_PLAYLIST_PLAYER_STATE = {
  playlistID: 1,
  songIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  currentTrackIndex: 0,
  shuffle: false,
  repeat: "none" as "none" | "all" | "one",
};

// Create the context with an empty default value
export const PlaylistPlayerContext = createContext<
  PlaylistPlayerContextValue | undefined
>(undefined);
