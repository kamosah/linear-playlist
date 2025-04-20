import React, { createContext } from "react";
import { Playlist } from "../types";
import DATA from "../data/playlists.json";

type DispatchFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export type PlaylistContextValue = {
  playlistIndex: number;
  songIndex: number;
  playlists: Playlist[];
  setPlaylistIndex: DispatchFunction<number>;
  setSongIndex: DispatchFunction<number>;
};

export const DEFAULT_PLAYLIST_STATE = {
  playlistIndex: 0,
  playlists: DATA.playlists,
  songIndex: 0,
};

// Create the context with an empty default value
export const PlaylistContext = createContext<PlaylistContextValue | undefined>(
  undefined
);
