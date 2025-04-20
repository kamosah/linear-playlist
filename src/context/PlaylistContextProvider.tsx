import { useState } from "react";
import { DEFAULT_STATE, PlaylistContext } from "./PlaylistContext";

export const PlaylistContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [playlistIndex, setPlaylistIndex] = useState<number>(
    DEFAULT_STATE.playlistIndex
  );
  const [songIndex, setSongIndex] = useState<number>(DEFAULT_STATE.songIndex);

  // Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(DEFAULT_STATE.isPlaying);
  const [currentTime, setCurrentTime] = useState<number>(
    DEFAULT_STATE.currentTime
  );
  const [duration, setDuration] = useState<number>(DEFAULT_STATE.duration);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(
    DEFAULT_STATE.currentTrackIndex
  );
  const [shuffle, setShuffle] = useState<boolean>(DEFAULT_STATE.shuffle);
  const [repeat, setRepeat] = useState<"none" | "all" | "one">(
    DEFAULT_STATE.repeat
  );

  return (
    <PlaylistContext.Provider
      value={{
        playlistIndex,
        setPlaylistIndex,
        setSongIndex,
        songIndex,
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        currentTrackIndex,
        setCurrentTrackIndex,
        shuffle,
        setShuffle,
        repeat,
        setRepeat,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
