import { CirclePlay } from "lucide-react";
import type { Playlist, Track } from "../../types";
import { formatTime } from "../../utils";
import { styled } from "styled-components";
import { useState } from "react";
import { DOCK_HEIGHT } from "../PlayerDock";
import { usePlaylist, usePlaylistPlayer } from "../../hooks";

type PlaylistItem = {
  artist: string;
} & Track;

const PlaylistItemContainer = styled.li`
  border-radius: ${({ theme }) => theme.border.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: grid;
  grid-template-columns: 11fr 1fr;
  padding: 0.5rem 1rem;
  position: relative;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;
const PlaylistItemInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const PlaylistItemSong = styled.p``;

const PlaylistItemPlaylistName = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
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

const PlaylistListContainer = styled.ul`
  max-height: calc(100vh - ${DOCK_HEIGHT} - 14rem);
  overflow-y: scroll;
  padding: 1rem 0rem;
  width: 100%;
`;

export const PlaylistListItem: React.FC<
  PlaylistItem & { togglePlay: () => void }
> = ({ artist, duration, name, togglePlay }) => {
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
          {hover ? (
            <CirclePlay
              onClick={() => {
                togglePlay();
              }}
            />
          ) : (
            formatTime(duration)
          )}
        </CenteredItem>
      </PlaylistItemDuration>
    </PlaylistItemContainer>
  );
};

export const PlaylistList: React.FC<Playlist> = ({ artist, tracks, id }) => {
  const { playlistID, setPlaylistID, setCurrentTrackIndex } = usePlaylist();
  const {
    togglePlayPause,
    currentTrackIndex,
    isPlaying,
    play,
    setCurrentTime,
  } = usePlaylistPlayer();
  return (
    <PlaylistListContainer>
      {tracks.map((track, trackIndex) => {
        const togglePlay = () => {
          if (
            playlistID === id &&
            currentTrackIndex === trackIndex &&
            isPlaying
          ) {
            togglePlayPause();
          } else {
            setPlaylistID(id);
            setCurrentTrackIndex(trackIndex);
            setCurrentTime(0);
            play();
          }
        };
        return (
          <PlaylistListItem
            togglePlay={togglePlay}
            key={track.id}
            artist={artist}
            {...track}
          />
        );
      })}
    </PlaylistListContainer>
  );
};
