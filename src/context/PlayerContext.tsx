import React, {
  createContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Playlist, Track } from "../types";

type RepeatMode = "none" | "one" | "all";

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  isLoading: boolean;
  playlist: Playlist | null;
  currentIndex: number;
  repeatMode: RepeatMode;
  shuffle: boolean;
  error: string | null;
}

interface PlayerContextType extends PlayerState {
  // Core playback controls
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;

  // Navigation controls
  next: () => void;
  previous: () => void;
  skipTo: (index: number) => void;

  // Playlist management
  setPlaylist: (playlist: Playlist, initialIndex?: number) => void;

  // Settings
  toggleShuffle: () => void;
  toggleRepeat: () => void;

  // Seeking
  seek: (time: number) => void;

  // Audio element reference (for advanced usage)
  audioRef: React.RefObject<HTMLAudioElement>;
}

// Create context
export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);

// Provider component
export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    isLoading: false,
    playlist: null,
    currentIndex: -1,
    repeatMode: "none",
    shuffle: false,
    error: null,
  });

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const pendingPlayRef = useRef<boolean>(false);

  // ======= Core Utility Functions =======

  // Safely attempt to play audio, handling browser restrictions and race conditions
  const attemptPlay = useCallback(async () => {
    if (!audioRef.current) return false;

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const playPromise = audioRef.current.play();

      // Modern browsers return a promise from play()
      if (playPromise !== undefined) {
        await playPromise;
        setState((prev) => ({ ...prev, isPlaying: true, isLoading: false }));
        return true;
      } else {
        // Older browsers don't return a promise
        setState((prev) => ({ ...prev, isPlaying: true, isLoading: false }));
        return true;
      }
    } catch (error) {
      // Handle autoplay restrictions, network errors, etc.
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        error: error instanceof Error ? error.message : "Playback failed",
      }));
      return false;
    }
  }, []);

  // Safely pause audio, handling potential race conditions
  const attemptPause = useCallback(() => {
    if (!audioRef.current) return;

    try {
      audioRef.current.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    } catch (error) {
      console.error("Error pausing:", error);
    }
  }, []);

  // Load a new track (with optional autoplay)
  const loadTrack = useCallback(
    (track: Track, autoPlay: boolean = false) => {
      if (!audioRef.current) return;

      // Reset state
      setState((prev) => ({
        ...prev,
        currentTrack: track,
        isLoading: true,
        error: null,
        isPlaying: false,
      }));

      // Check if we're already loaded with this song to avoid unnecessary reloading
      if (audioRef.current.src === track.url && !audioRef.current.error) {
        if (autoPlay) {
          attemptPlay();
        }
        return;
      }

      // Set the pending play flag if we want to autoplay
      pendingPlayRef.current = autoPlay;

      // Change the source and load the new track
      audioRef.current.src = track.url;
      audioRef.current.load();

      // We'll let the canplaythrough event handle autoplay
    },
    [attemptPlay]
  );

  // Get the next track index based on repeat and shuffle settings
  const getNextIndex = useCallback(() => {
    const { currentIndex, playlist, repeatMode, shuffle } = state;
    if (!playlist) return;

    if (repeatMode === "one") {
      return currentIndex;
    }

    if (shuffle) {
      // Get a random track that's not the current one
      if (playlist.tracks.length <= 1) return currentIndex;

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * playlist.tracks.length);
      } while (randomIndex === currentIndex);

      return randomIndex;
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex >= playlist.tracks.length) {
      return repeatMode === "all" ? 0 : -1; // -1 indicates end of playlist
    }

    return nextIndex;
  }, [state]);

  // Get the previous track index
  const getPreviousIndex = useCallback(() => {
    const { currentIndex, playlist, repeatMode } = state;

    // If we're at the beginning of the playlist and repeat is off
    if (currentIndex <= 0 && repeatMode !== "all") {
      // Always return 0 (beginning of playlist) if we're already at the beginning
      return 0;
    }

    const prevIndex = currentIndex - 1;

    if (prevIndex < 0) {
      // If repeat all, go to the last track
      return repeatMode === "all" ? playlist!.tracks!.length - 1 : 0;
    }

    return prevIndex;
  }, [state]);

  // ======= Public API Functions =======

  // Playback controls
  const play = useCallback(() => {
    if (state.isPlaying || !state.playlist) return;

    if (!state.currentTrack && state.playlist.tracks.length > 0) {
      // If nothing is loaded but we have a playlist, load the first track
      const index = state.currentIndex >= 0 ? state.currentIndex : 0;
      loadTrack(state.playlist.tracks[index], true);
    } else {
      // Otherwise try to play current track
      attemptPlay();
    }
  }, [state, loadTrack, attemptPlay]);

  const pause = useCallback(() => {
    if (!state.isPlaying) return;
    attemptPause();
  }, [state.isPlaying, attemptPause]);

  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  // Navigation
  const skipTo = useCallback(
    (index: number) => {
      if (!state.playlist) return;
      if (index < 0 || index >= (state?.playlist?.tracks?.length || 0)) return;

      setState((prev) => ({ ...prev, currentIndex: index }));
      loadTrack(state?.playlist?.tracks?.[index], state.isPlaying);
    },
    [state.playlist, state.isPlaying, loadTrack]
  );

  const next = useCallback(() => {
    const nextIndex = getNextIndex();
    if (!nextIndex && nextIndex !== 0) return;
    if (nextIndex === -1) {
      // End of playlist and not repeating
      attemptPause();
      return;
    }

    skipTo(nextIndex);
  }, [getNextIndex, skipTo, attemptPause]);

  // Updated previous function with reset current time behavior
  const previous = useCallback(() => {
    if (!audioRef.current) return;

    // If we're more than 3 seconds into the song, just restart current track
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      // If we're playing, continue playing from the beginning
      if (state.isPlaying) {
        attemptPlay();
      }
      return;
    }

    // Otherwise go to the previous track
    const prevIndex = getPreviousIndex();
    skipTo(prevIndex);
  }, [getPreviousIndex, skipTo, state.isPlaying, attemptPlay]);

  // Playlist management
  const setPlaylist = useCallback(
    (playlist: Playlist, initialIndex: number = 0) => {
      const validIndex =
        playlist.tracks.length > 0
          ? Math.max(0, Math.min(initialIndex, playlist.tracks.length - 1))
          : -1;

      setState((prev) => ({
        ...prev,
        playlist,
        currentIndex: validIndex,
        currentTrack: validIndex >= 0 ? playlist.tracks[validIndex] : null,
      }));

      if (validIndex >= 0) {
        loadTrack(playlist.tracks[validIndex], state.isPlaying);
      }
    },
    [state.isPlaying, loadTrack]
  );

  // Settings
  const toggleShuffle = useCallback(() => {
    setState((prev) => ({ ...prev, shuffle: !prev.shuffle }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setState((prev) => {
      const modes: RepeatMode[] = ["none", "one", "all"];
      const currentIndex = modes.indexOf(prev.repeatMode);
      const nextIndex = (currentIndex + 1) % modes.length;
      return { ...prev, repeatMode: modes[nextIndex] };
    });
  }, []);

  // Seeking
  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;

    try {
      audioRef.current.currentTime = time;
    } catch (error) {
      console.error("Error seeking:", error);
    }
  }, []);

  // ======= Event Listeners =======

  // Set up event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlayThrough = () => {
      setState((prev) => ({ ...prev, isLoading: false }));

      // If we have a pending play request, attempt to play now
      if (pendingPlayRef.current) {
        pendingPlayRef.current = false;
        attemptPlay();
      }
    };

    const handleEnded = () => {
      if (state.repeatMode === "none") {
        attemptPause();
        return;
      }
      next();
    };

    const handleError = (e: ErrorEvent) => {
      console.error("Audio error:", e);
      console.log("message: ", e.message);
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        error: "Error loading audio",
      }));
    };

    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [next, attemptPlay, audioRef]);

  // Initial setup
  useEffect(() => {
    if (!audioRef.current) {
      // @ts-expect-error Used to change audio setting
      audioRef.current = new Audio();
      audioRef.current.preload = "auto";
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Provide all the functions and state
  const value: PlayerContextType = {
    ...state,
    play,
    pause,
    togglePlayPause,
    next,
    previous,
    skipTo,
    setPlaylist,
    toggleShuffle,
    toggleRepeat,
    seek,
    audioRef,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
