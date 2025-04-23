import { useState } from "react";
import { DEFAULT_PLAYLIST_STATE, PlaylistContext } from "./PlaylistContext";

export const PlaylistContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [playlists, _] = useState(DEFAULT_PLAYLIST_STATE.playlists);

  return (
    <PlaylistContext.Provider value={{ playlists }}>
      {children}
    </PlaylistContext.Provider>
  );
};
