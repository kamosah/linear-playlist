import React, { createContext } from "react";
import { Playlist } from "../types";
import DATA from "../data/playlists.json";

type DispatchFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export type PlaylistContextValue = {
  playlistID: number;
  currentTrackIndex: number;
  playlists: Playlist[];
  setPlaylistID: DispatchFunction<number>;
  setCurrentTrackIndex: DispatchFunction<number>;
};

export const DEFAULT_PLAYLIST_STATE = {
  playlistID: 1,
  playlists: DATA.playlists,
  currentTrackIndex: 0,
} as const;

// Create the context with an empty default value
export const PlaylistContext = createContext<PlaylistContextValue | undefined>(
  undefined
);
