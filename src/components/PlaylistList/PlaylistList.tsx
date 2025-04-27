import { PauseCircle, PlayCircle, Volume2 } from "lucide-react";
import type { Playlist, Track } from "../../types";
import { formatTime } from "../../utils";
import { styled } from "styled-components";
import { useState } from "react";
import { DOCK_HEIGHT } from "../PlayerDock";
import { useAudioPlayer, usePlaylist } from "../../hooks";
import { INDIGO_700 } from "../../styles";
import { IconButton } from "../IconButton";

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
  overflow-y: auto;
  padding-bottom: 1rem;
  width: 100%;
`;

export const PlaylistListItem: React.FC<
  PlaylistItem & {
    onActionClick: React.MouseEventHandler<HTMLButtonElement>;
    isPlayingNow: boolean;
    onItemClick: () => void;
  }
> = ({ artist, duration, name, onActionClick, isPlayingNow, onItemClick }) => {
  const [hover, setHover] = useState(false);

  const displayAction = () => {
    if (hover) {
      if (isPlayingNow) {
        return (
          <IconButton data-test-id="pause-circle" onClick={onActionClick}>
            <PauseCircle />
          </IconButton>
        );
      } else {
        return (
          <IconButton data-test-id="play-circle" onClick={onActionClick}>
            <PlayCircle />
          </IconButton>
        );
      }
    } else {
      if (isPlayingNow) {
        return (
          <IconButton data-testid="is-playing-now">
            <Volume2 color={INDIGO_700} />
          </IconButton>
        );
      } else {
        return formatTime(duration);
      }
    }
  };
  return (
    <PlaylistItemContainer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onItemClick}
      data-testid="playlist-list-item"
    >
      <PlaylistItemInfo>
        <PlaylistItemSong>{name}</PlaylistItemSong>
        <PlaylistItemPlaylistName>{artist}</PlaylistItemPlaylistName>
      </PlaylistItemInfo>
      <PlaylistItemDuration>
        <CenteredItem>{displayAction()}</CenteredItem>
      </PlaylistItemDuration>
    </PlaylistItemContainer>
  );
};

export const PlaylistList: React.FC<Playlist> = (playlist) => {
  const { artist, tracks, id } = playlist;
  const player = useAudioPlayer();
  const { playlists } = usePlaylist();
  const onItemClick = (trackIndex: number) => async () => {
    await player.setPlaylist(playlists[id - 1], trackIndex);
  };
  return (
    <PlaylistListContainer>
      {tracks.map((track, trackIndex) => {
        const onActionClick: React.MouseEventHandler<
          HTMLButtonElement
        > = async (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (
            player?.playlist?.id !== id ||
            player?.currentTrack?.id !== track.id
          ) {
            await player.setPlaylist(
              playlists[playlist.id - 1],
              trackIndex,
              true
            );
          } else {
            await player.togglePlayPause();
          }
        };
        return (
          <PlaylistListItem
            onActionClick={onActionClick}
            key={track.id}
            artist={artist}
            onItemClick={onItemClick(trackIndex)}
            isPlayingNow={
              player?.isPlaying &&
              player?.currentTrack?.id === track.id &&
              player?.playlist?.id === playlist.id
            }
            {...track}
          />
        );
      })}
    </PlaylistListContainer>
  );
};
