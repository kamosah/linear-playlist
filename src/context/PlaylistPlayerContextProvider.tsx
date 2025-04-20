import { useState } from "react";
import {
  DEFAULT_PLAYLIST_PLAYER_STATE,
  PlaylistPlayerContext,
} from "./PlaylistPlayerContext";

export const PlaylistPlayerContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(
    DEFAULT_PLAYLIST_PLAYER_STATE.isPlaying
  );
  const [currentTime, setCurrentTime] = useState<number>(
    DEFAULT_PLAYLIST_PLAYER_STATE.currentTime
  );
  const [duration, setDuration] = useState<number>(
    DEFAULT_PLAYLIST_PLAYER_STATE.duration
  );
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(
    DEFAULT_PLAYLIST_PLAYER_STATE.currentTrackIndex
  );
  const [shuffle, setShuffle] = useState<boolean>(
    DEFAULT_PLAYLIST_PLAYER_STATE.shuffle
  );
  const [repeat, setRepeat] = useState<"none" | "all" | "one">(
    DEFAULT_PLAYLIST_PLAYER_STATE.repeat
  );

  return (
    <PlaylistPlayerContext.Provider
      value={{
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
    </PlaylistPlayerContext.Provider>
  );
};
