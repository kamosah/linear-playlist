import { useRef, useState } from "react";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const play = (): void => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const pause = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // This promise handles autoplay restrictions in browsers
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Error changing track:", error);
            setIsPlaying(false);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <PlaylistPlayerContext.Provider
      value={{
        currentTime,
        currentTrackIndex,
        duration,
        isPlaying,
        repeat,
        setCurrentTime,
        setCurrentTrackIndex,
        setDuration,
        setIsPlaying,
        setRepeat,
        setShuffle,
        shuffle,
        togglePlayPause,
        audioRef,
        play,
        pause,
      }}
    >
      {children}
    </PlaylistPlayerContext.Provider>
  );
};
