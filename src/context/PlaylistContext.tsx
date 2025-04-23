import { createContext } from "react";
import { Playlist } from "../types";
import DATA from "../data/playlists.json";

export type PlaylistContextValue = {
  playlists: Playlist[];
};

export const DEFAULT_PLAYLIST_STATE = {
  playlists: DATA.playlists,
} as const;

// Create the context with an empty default value
export const PlaylistContext = createContext<PlaylistContextValue | undefined>(
  undefined
);
