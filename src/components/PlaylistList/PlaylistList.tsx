import { CirclePlay } from "lucide-react";
import type { Playlist, Track } from "../../types";
import { formatTime } from "../../utils";
import { styled } from "styled-components";
import { useState } from "react";

type PlaylistItem = {
  artist: string;
} & Track;

const PlaylistItemContainer = styled.li`
  display: grid;
  grid-template-columns: 11fr 1fr;
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.border.lg};
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
  padding: 0.5rem 1rem;
`;
const PlaylistItemInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const PlaylistItemSong = styled.p``;
const PlaylistItemPlaylistName = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.muted};
`;

const PlaylistItemDuration = styled.div`
  align-items: center;
  display: grid;
`;

const CenteredItem = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const PlaylistListItem: React.FC<PlaylistItem> = ({
  artist,
  duration,
  name,
  url,
}) => {
  const [hover, setHover] = useState(false);
  return (
    <PlaylistItemContainer
      className="group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <PlaylistItemInfo>
        <PlaylistItemSong>{name}</PlaylistItemSong>
        <PlaylistItemPlaylistName>{artist}</PlaylistItemPlaylistName>
      </PlaylistItemInfo>
      <PlaylistItemDuration>
        <CenteredItem>
          {hover ? <CirclePlay /> : formatTime(duration)}
        </CenteredItem>
      </PlaylistItemDuration>
    </PlaylistItemContainer>
  );
};

const PlaylistListContainer = styled.ul`
  width: 100%;
`;

export const PlaylistList: React.FC<Playlist> = ({ name: artist, tracks }) => {
  return (
    <PlaylistListContainer>
      {tracks.map((track) => (
        <PlaylistListItem key={track.name} artist={artist} {...track} />
      ))}
    </PlaylistListContainer>
  );
};
