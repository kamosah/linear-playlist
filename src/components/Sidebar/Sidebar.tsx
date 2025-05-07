import { House, PauseCircle, PlayCircle, Volume2 } from "lucide-react";
import { styled, useTheme } from "styled-components";
import { GRAY_950, INDIGO_700 } from "../../styles";
import { Link, useParams } from "react-router-dom";
import { useAudioPlayer, usePlaylist } from "../../hooks";
import React, { useState } from "react";
import { Playlist } from "../../types";
import { IconButton } from "../IconButton";

const SidebarNavigationContainer = styled.aside`
  border-right: ${({ theme }) => `1px solid ${theme.colors.border}`};
  height: 100%;
`;

const SidebarSection = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  height: 100%;
  overflow-y: auto;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  width: inherit;
`;

const SidebarHeadList = styled.ul`
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-clip: padding-box;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const SidebarHeadItem = styled.li`
  border-radius: ${({ theme }) => theme.border.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding-inline-start: ${({ theme }) => theme.spacing.xs};
  padding: 1rem;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const NavItemContainer = styled.li<{
  $isActive: boolean;
  $isCollapsed?: boolean;
}>`
  background-color: ${({ $isActive, theme }) =>
    $isActive && theme.colors.active};
  border-radius: ${({ theme }) => theme.border.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: grid;
  grid-template-columns: ${({ $isCollapsed }) =>
    $isCollapsed ? "1fr" : "11fr 1fr"};
  padding: 0.5rem 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const SidebarNavList = styled.ul`
  border-top: ${({ theme }) => `1px solid ${theme.colors.border}`};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  width: 100%;
  overflow-y: auto;
`;

const SidebarNavItemText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SidebarNavItemCaption = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SidebarHeadItemWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledHeaderText = styled.span`
  margin-left: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PlaylistItemInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const PlaylistItemAction = styled.div`
  align-items: center;
  display: grid;
`;

const CenteredItem = styled.div`
  align-items: center;
  display: flex;
`;

const SidebarNavItem: React.FC<
  Playlist & {
    isPlayingNow: boolean;
    $isActive: boolean;
    onActionClick: React.MouseEventHandler<HTMLButtonElement>;
  }
> = ({ id, isPlayingNow, name, artist, onActionClick, $isActive }) => {
  const [hover, setHover] = useState(false);
  const theme = useTheme();
  const displayAction = () => {
    if (hover) {
      if (isPlayingNow) {
        return (
          <IconButton onClick={onActionClick}>
            <PauseCircle />
          </IconButton>
        );
      } else {
        return (
          <IconButton onClick={onActionClick}>
            <PlayCircle />
          </IconButton>
        );
      }
    } else {
      if (isPlayingNow) {
        return (
          <IconButton>
            <Volume2 color={theme.mode === "dark" ? INDIGO_700 : GRAY_950} />
          </IconButton>
        );
      }
    }
  };
  return (
    <Link to={`/playlist/${id}`}>
      <NavItemContainer
        $isActive={$isActive}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <PlaylistItemInfo>
          <SidebarNavItemText>{name}</SidebarNavItemText>
          <SidebarNavItemCaption>{artist}</SidebarNavItemCaption>
        </PlaylistItemInfo>
        <PlaylistItemAction>
          <CenteredItem>{displayAction()}</CenteredItem>
        </PlaylistItemAction>
      </NavItemContainer>
    </Link>
  );
};

export const SidebarNavigation = () => {
  const { id } = useParams() as { id: string };
  const { playlists } = usePlaylist();
  const player = useAudioPlayer();

  return (
    <SidebarNavigationContainer aria-label="Sidebar">
      <SidebarSection>
        <SidebarHeadList>
          <SidebarHeadItem>
            <Link to="/">
              <SidebarHeadItemWrapper>
                <House
                  style={{
                    display: "inline",
                    fontSize: "0.875rem",
                  }}
                  size={"1em"}
                />
                <StyledHeaderText>Home</StyledHeaderText>
              </SidebarHeadItemWrapper>
            </Link>
          </SidebarHeadItem>
        </SidebarHeadList>

        <SidebarNavList>
          {playlists.map((playlist) => {
            const onActionClick: React.MouseEventHandler<
              HTMLButtonElement
            > = async (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (player?.playlist?.id !== playlist.id) {
                await player.setPlaylist(playlists[playlist.id - 1], 0, true);
              } else {
                await player.togglePlayPause();
              }
            };
            return (
              <SidebarNavItem
                key={playlist.id}
                onActionClick={onActionClick}
                isPlayingNow={
                  player?.playlist?.id === playlist.id && player.isPlaying
                }
                $isActive={+id === playlist.id}
                {...playlist}
              />
            );
          })}
        </SidebarNavList>
      </SidebarSection>
    </SidebarNavigationContainer>
  );
};
