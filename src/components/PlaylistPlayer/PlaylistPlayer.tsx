import React, { useRef, useState, useEffect } from "react";

import {
  Play,
  Pause,
  Shuffle,
  SkipBack,
  Repeat1,
  Repeat,
  SkipForward,
} from "lucide-react";
import type { Playlist } from "../../types";
import { MediaButton } from "../MediaButton";
import { PlaylistList } from "../PlaylistList";
import { formatTime } from "../../utils";

type PlaylistPlayerProps = {
  playlist: Playlist;
  initialTrackIndex?: number;
};

export const PlaylistPlayer: React.FC<PlaylistPlayerProps> = ({
  playlist,
  initialTrackIndex = 0,
}) => {
  const { tracks } = playlist;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTrackIndex, setCurrentTrackIndex] =
    useState<number>(initialTrackIndex);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<"none" | "all" | "one">("none");

  const currentTrack = tracks[currentTrackIndex];

  const togglePlayPause = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextTrack = (): void => {
    if (repeat === "one") {
      // Replay the current track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    if (shuffle) {
      // Play a random track that isn't the current one
      let nextIndex = currentTrackIndex;
      while (nextIndex === currentTrackIndex && tracks.length > 1) {
        nextIndex = Math.floor(Math.random() * tracks.length);
      }
      setCurrentTrackIndex(nextIndex);
    } else {
      // Play next track or loop to first
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else if (repeat === "all") {
        setCurrentTrackIndex(0);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const playPrevTrack = (): void => {
    // If we're past 3 seconds into the track, restart the current track
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    if (shuffle) {
      // Play a random track
      let prevIndex = currentTrackIndex;
      while (prevIndex === currentTrackIndex && tracks.length > 1) {
        prevIndex = Math.floor(Math.random() * tracks.length);
      }
    } else {
      // Play previous track or loop to last
      if (currentTrackIndex > 0) {
        setCurrentTrackIndex(currentTrackIndex - 1);
      } else if (repeat === "all") {
        setCurrentTrackIndex(tracks.length - 1);
      }
    }
  };

  const toggleShuffle = (): void => {
    setShuffle(!shuffle);
  };

  const toggleRepeat = (): void => {
    if (repeat === "none") {
      setRepeat("all");
    } else if (repeat === "all") {
      setRepeat("one");
    } else {
      setRepeat("none");
    }
  };

  // Progress bar change handle (same as basic audio player)
  const handleProgressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    // Reset audio and update when track changes
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);

      if (isPlaying) {
        try {
          audioRef.current.play();
        } catch (error) {
          console.error("Play error:", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleEnded = () => {
        playNextTrack();
      };

      // Add event listeners
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);
      };
    }
  }, [currentTrackIndex, shuffle, repeat]);

  return (
    <div className="playlist-player">
      <audio ref={audioRef} src={currentTrack.url} preload="metadata" />

      <div className="now-playing text-white">
        <div className="track-info">
          <h3 className="title">{currentTrack.name}</h3>
          <p className="artist">{playlist.artist}</p>
        </div>
      </div>

      <div className="controls">
        <MediaButton
          onClick={toggleShuffle}
          className={`shuffle-button ${shuffle ? "active" : ""}`}
          aria-label="Shuffle"
          aria-pressed={shuffle}
        >
          <Shuffle />
        </MediaButton>

        <MediaButton
          onClick={playPrevTrack}
          className="prev-button"
          aria-label="Previous track"
        >
          <SkipBack />
        </MediaButton>

        <MediaButton
          onClick={togglePlayPause}
          className="play-pause-button"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause /> : <Play />}
        </MediaButton>

        <MediaButton
          onClick={playNextTrack}
          className="next-button"
          aria-label="Next track"
        >
          <SkipForward />
        </MediaButton>

        <MediaButton
          onClick={toggleRepeat}
          // TODO: Implement repeat active state
          // className={`repeat-button ${repeat !== "none" ? "active" : ""}`}
          className="repeat-button"
          aria-label={`Repeat ${repeat}`}
          isActive={repeat !== "none"}
        >
          {repeat === "one" ? <Repeat1 /> : <Repeat />}
        </MediaButton>
      </div>

      <div className="progress-container">
        <span className="current-time">{formatTime(currentTime)}</span>
        <input
          type="range"
          className="progress-bar"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          step="0.1"
        />
        <span className="duration">{formatTime(duration)}</span>
      </div>

      {/* <div className="playlist">
        <h4>Playlist ({tracks.length} tracks)</h4>
        <ul className="track-list">
          {tracks.map((track, index) => (
            <li
              key={track.name}
              className={`track-item ${
                index === currentTrackIndex ? "active" : ""
              }`}
              onClick={() => setCurrentTrackIndex(index)}
            >
              <span className="track-number">{index + 1}</span>
              <div className="track-details">
                <span className="track-title">{track.name}</span>
                <span className="track-artist">{playlist.artist}</span>
              </div>
            </li>
          ))}
        </ul>
      </div> */}
      <PlaylistList
        artist={playlist.artist}
        name={playlist.name}
        tracks={playlist.tracks}
        year={playlist.year}
      />
    </div>
  );
};
