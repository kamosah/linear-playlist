import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Captions,
  ListMusic,
  LoaderCircle,
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
import { formatTime } from "../../utils";
import { useAudioPlayer } from "../../hooks";

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
  color: ${({ $isActive }) => ($isActive ? "white" : "#cbd5e1")};
  cursor: pointer;
  display: flex;
  font-weight: ${({ $isActive }) => $isActive && "bold"};
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

export const PlayerDock: React.FC = () => {
  const player = useAudioPlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Update time display
  useEffect(() => {
    const audio = player.audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, [player.audioRef]);

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    player.seek(value);
  };
  const displayDock = Boolean(player.currentTrack) && Boolean(player.playlist);

  return (
    displayDock && (
      <Dock>
        <audio
          ref={player.audioRef}
          src={player.audioRef.current?.src}
          preload="auto"
        />
        <SongInfo>
          <SongTitle>{player.currentTrack?.name}</SongTitle>
          <ArtistName>{player?.playlist?.artist}</ArtistName>
        </SongInfo>

        <Controls>
          <ControlRow>
            <IconButton
              aria-pressed={player.shuffle}
              aria-label="Shuffle"
              onClick={player.toggleShuffle}
            >
              <Shuffle size="1em" />
            </IconButton>
            <IconButton>
              <SkipBack
                aria-label="Previous track"
                className="prev-button"
                onClick={player.previous}
                size="1em"
              />
            </IconButton>
            <IconButton
              onClick={player.togglePlayPause}
              className="play-pause-button"
              aria-label={player.isPlaying ? "Pause" : "Play"}
            >
              {player.isLoading ? (
                <LoaderCircle size="1em" />
              ) : player.isPlaying ? (
                <Pause size="1em" />
              ) : (
                <Play size="1em" />
              )}
            </IconButton>
            <IconButton
              onClick={player.next}
              className="next-button"
              aria-label="Next track"
            >
              <SkipForward size="1em" />
            </IconButton>
            <IconButton
              onClick={player.toggleRepeat}
              // TODO: Implement repeat active state
              // className={`repeat-button ${repeat !== "none" ? "active" : ""}`}
              className="repeat-button"
              aria-label={`Repeat ${player.repeatMode}`}
              $isActive={player.repeatMode !== "none"}
            >
              {player.repeatMode === "one" ? (
                <Repeat1 size="1em" />
              ) : (
                <Repeat size="1em" />
              )}
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
              // onChange={handleProgressChange}
              onChange={handleSeek}
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
    )
  );
};
