import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  LoaderCircle,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { GRAY_700, GRAY_800 } from "../../styles";
import { formatTime } from "../../utils";
import { useAudioPlayer } from "../../hooks";
import { IconButton } from "../IconButton";

export const DOCK_HEIGHT = "6rem";

const Dock = styled.div`
  background-color: ${GRAY_800};
  border-top: 2px solid ${GRAY_700};
  display: grid;
  grid-template-columns: 1fr;
  height: ${DOCK_HEIGHT};
  padding: 0 2rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SongInfo = styled.div<{ $displayInfo: boolean }>`
  display: ${({ $displayInfo }) => ($displayInfo ? "flex" : "hidden")};
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

const Progress = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`;

const StyledRange = styled.input`
  appearance: none;
  background: #334155;
  border-radius: 9999px;
  height: 6px;
  outline: none;
  transition: background 0.2s;
  width: 100%;

  &::-webkit-slider-thumb {
    appearance: none;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    height: 12px;
    width: 12px;
  }

  &::-moz-range-thumb {
    background: #3b82f6;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    height: 12px;
    width: 12px;
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
  }, [player.audioRef, player.currentTrack]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    player.seek(value);
  };

  const getPlayerIcon = () => {
    if (player.isLoading) {
      return <LoaderCircle size="1em" />;
    }
    if (player.isPlaying) {
      return <Pause size="1em" />;
    } else {
      return <Play size="1em" />;
    }
  };

  const displayInfo = Boolean(player.currentTrack) && Boolean(player.playlist);

  return (
    <Dock>
      <audio
        ref={player.audioRef}
        src={player.audioRef.current?.src}
        preload="auto"
      />

      <SongInfo $displayInfo={displayInfo}>
        <SongTitle>{player.currentTrack?.name}</SongTitle>
        <ArtistName>{player?.playlist?.artist}</ArtistName>
      </SongInfo>

      <Controls>
        <ControlRow>
          <IconButton
            aria-pressed={player.shuffle}
            aria-label="Shuffle"
            onClick={player.toggleShuffle}
            $isActive={player.shuffle}
          >
            <Shuffle size="1em" {...(player.shuffle && { strokeWidth: 3 })} />
          </IconButton>
          <IconButton disabled={!player.currentTrack} onClick={player.previous}>
            <SkipBack
              aria-label="Previous track"
              className="prev-button"
              size="1em"
            />
          </IconButton>
          <IconButton
            aria-label={player.isPlaying ? "Pause" : "Play"}
            className="play-pause-button"
            disabled={!player.currentTrack || player.isLoading}
            onClick={player.togglePlayPause}
          >
            {getPlayerIcon()}
          </IconButton>
          <IconButton
            disabled={!player.currentTrack}
            onClick={player.next}
            className="next-button"
            aria-label="Next track"
          >
            <SkipForward size="1em" />
          </IconButton>
          <IconButton
            $isActive={player.repeatMode !== "none"}
            aria-label={`Repeat ${player.repeatMode}`}
            className="repeat-button"
            onClick={player.toggleRepeat}
          >
            {player.repeatMode === "one" ? (
              <Repeat1 size="1em" strokeWidth={3} />
            ) : (
              <Repeat
                {...(player.repeatMode !== "none" && { strokeWidth: 3 })}
                size="1em"
              />
            )}
          </IconButton>
        </ControlRow>
        <Progress>
          <span style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
            {formatTime(currentTime)}
          </span>
          <StyledRange
            disabled={!player.currentTrack}
            max={duration || 100}
            min="0"
            onChange={handleSeek}
            type="range"
            value={currentTime}
          />
          <span style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
            {formatTime(duration)}
          </span>
        </Progress>
      </Controls>
    </Dock>
  );
};
