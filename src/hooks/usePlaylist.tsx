import { useContext } from "react";
import { PlaylistContext, PlaylistContextValue } from "../context";

export const usePlaylist = (): PlaylistContextValue => {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error(
      "useMyContext must be used within a PlaylistContextProvider"
    );
  }

  return context;
};
