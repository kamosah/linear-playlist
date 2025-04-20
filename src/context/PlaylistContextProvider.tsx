import { useState } from "react";
import { DEFAULT_PLAYLIST_STATE, PlaylistContext } from "./PlaylistContext";

export const PlaylistContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [playlistIndex, setPlaylistIndex] = useState<number>(
    DEFAULT_PLAYLIST_STATE.playlistIndex
  );
  const [songIndex, setSongIndex] = useState<number>(
    DEFAULT_PLAYLIST_STATE.songIndex
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [playlists, _] = useState(DEFAULT_PLAYLIST_STATE.playlists);

  return (
    <PlaylistContext.Provider
      value={{
        playlistIndex,
        playlists,
        setPlaylistIndex,
        setSongIndex,
        songIndex,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
