import React from "react";
import styled from "styled-components";
import {
  Captions,
  ListMusic,
  Maximize2,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { GRAY_700, GRAY_800 } from "../../styles";

const Dock = styled.div`
  background-color: ${GRAY_800};
  border-top: 2px solid ${GRAY_700};
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr;
  height: 6rem;
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

const IconButton = styled.button`
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

const ProgressBar = styled.div`
  background-color: #334155;
  border-radius: 9999px;
  flex-grow: 1;
  height: 0.375rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  background-color: #3b82f6;
  border-radius: 9999px;
  height: 100%;
  width: 65%;
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

export const PlayerDock: React.FC = () => {
  return (
    <Dock>
      <SongInfo>
        <SongTitle>Song Name</SongTitle>
        <ArtistName>Artist</ArtistName>
      </SongInfo>

      <Controls>
        <ControlRow>
          <IconButton>
            <Shuffle size="1em" />
          </IconButton>
          <IconButton>
            <SkipBack size="1em" />
          </IconButton>
          <IconButton>
            <Play size="1em" />
          </IconButton>
          <IconButton>
            <SkipForward size="1em" />
          </IconButton>
          <IconButton>
            <Repeat size="1em" />
          </IconButton>
        </ControlRow>
        <Progress>
          <span style={{ fontSize: "0.875rem", color: "#94a3b8" }}>3:45</span>
          <ProgressBar>
            <ProgressFill />
          </ProgressBar>
          <span style={{ fontSize: "0.875rem", color: "#94a3b8" }}>5:00</span>
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
