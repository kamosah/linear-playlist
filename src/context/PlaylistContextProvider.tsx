import { useState } from "react";
import { DEFAULT_PLAYLIST_STATE, PlaylistContext } from "./PlaylistContext";

export const PlaylistContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [playlistID, setPlaylistID] = useState<number>(
    DEFAULT_PLAYLIST_STATE.playlistID
  );
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(
    DEFAULT_PLAYLIST_STATE.currentTrackIndex
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [playlists, _] = useState(DEFAULT_PLAYLIST_STATE.playlists);

  return (
    <PlaylistContext.Provider
      value={{
        playlistID,
        playlists,
        setPlaylistID,
        setCurrentTrackIndex,
        currentTrackIndex,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
