import { useContext } from "react";
import {
  PlaylistPlayerContext,
  PlaylistPlayerContextValue,
} from "../context/PlaylistPlayerContext";

export const usePlaylistPlayer = (): PlaylistPlayerContextValue => {
  const context = useContext(PlaylistPlayerContext);

  if (!context) {
    throw new Error(
      "useMyContext must be used within a PlaylistPlayerContextProvider"
    );
  }

  return context;
};
