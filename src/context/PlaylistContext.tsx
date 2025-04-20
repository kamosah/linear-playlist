import React, { createContext } from "react";

type Repeat = "none" | "all" | "one";

type DispatchFunction<T> = React.Dispatch<React.SetStateAction<T>>;

// Define the shape of the context value
export type PlaylistContextValue = {
  playlistIndex: number;
  setPlaylistIndex: DispatchFunction<number>;
  songIndex: number;
  setSongIndex: DispatchFunction<number>;
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
};

export const DEFAULT_STATE = {
  playlistIndex: 0,
  songIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  currentTrackIndex: 0,
  shuffle: false,
  repeat: "none" as "none" | "all" | "one",
};

// Create the context with an empty default value
export const PlaylistContext = createContext<PlaylistContextValue | undefined>(
  undefined
);
