import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Captions,
  ListMusic,
  Maximize2,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { GRAY_700, GRAY_800 } from "../../styles";
import { Playlist } from "../../types";
import MOCK_DATA from "../../data/playlists.json";
import { formatTime } from "../../utils";

export const DOCK_HEIGHT = "6rem";

const Dock = styled.div`
  background-color: ${GRAY_800};
  border-top: 2px solid ${GRAY_700};
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr;
  height: ${DOCK_HEIGHT};
  left: 0;
  padding: 0 2rem;
  position: fixed;
  width: 100%;
  z-index: 50;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SongTitle = styled.span`
  color: white;
  font-size: 0.875rem;
  overflow: hidden;
  padding-left: 0.75rem;
  padding-top: 0.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ArtistName = styled.span`
  color: #94a3b8;
  font-size: 0.75rem;
  overflow: hidden;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ControlRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const IconButton = styled.button<{ $isActive?: boolean }>`
  align-items: center;
  background: transparent;
  border-radius: 9999px;
  color: #cbd5e1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.625rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #334155;
    color: white;
  }

  &:focus {
    box-shadow: 0 0 0 4px #3b82f6;
    outline: none;
  }
`;

const Progress = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`;

const RightActions = styled.div`
  align-items: center;
  display: none;
  gap: 0.5rem;
  justify-content: center;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const StyledRange = styled.input`
  appearance: none;
  width: 100%;
  height: 6px;
  background: #334155;
  border-radius: 9999px;
  outline: none;
  transition: background 0.2s;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
`;

type PlaylistPlayerProps = {
  playlist: Playlist;
  initialTrackIndex?: number;
};

export const PlayerDock: React.FC<PlaylistPlayerProps> = ({
  playlist = MOCK_DATA.playlists[0],
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
    <Dock>
      <audio ref={audioRef} src={currentTrack.url} preload="metadata" />
      <SongInfo>
        <SongTitle>{currentTrack.name}</SongTitle>
        <ArtistName>{playlist.artist}</ArtistName>
      </SongInfo>

      <Controls>
        <ControlRow>
          <IconButton
            aria-pressed={shuffle}
            aria-label="Shuffle"
            onClick={toggleShuffle}
          >
            <Shuffle size="1em" />
          </IconButton>
          <IconButton>
            <SkipBack
              aria-label="Previous track"
              className="prev-button"
              onClick={playPrevTrack}
              size="1em"
            />
          </IconButton>
          <IconButton
            onClick={togglePlayPause}
            className="play-pause-button"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size="1em" /> : <Play size="1em" />}
          </IconButton>
          <IconButton
            onClick={playNextTrack}
            className="next-button"
            aria-label="Next track"
          >
            <SkipForward size="1em" />
          </IconButton>
          <IconButton
            onClick={toggleRepeat}
            // TODO: Implement repeat active state
            // className={`repeat-button ${repeat !== "none" ? "active" : ""}`}
            className="repeat-button"
            aria-label={`Repeat ${repeat}`}
            $isActive={repeat !== "none"}
          >
            {repeat === "one" ? <Repeat1 size="1em" /> : <Repeat size="1em" />}
          </IconButton>
        </ControlRow>
        <Progress>
          <span style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
            {formatTime(currentTime)}
          </span>
          <StyledRange
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleProgressChange}
          />
          <span style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
            {formatTime(duration)}
          </span>
        </Progress>
      </Controls>

      <RightActions>
        <IconButton>
          <ListMusic size="1em" />
        </IconButton>
        <IconButton>
          <Captions size="1em" />
        </IconButton>
        <IconButton>
          <Maximize2 size="1em" />
        </IconButton>
        <IconButton>
          <Volume2 size="1em" />
        </IconButton>
      </RightActions>
    </Dock>
  );
};
