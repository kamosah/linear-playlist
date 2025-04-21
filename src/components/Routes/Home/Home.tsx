import { styled } from "styled-components";
import { usePlaylist } from "../../../hooks";
import { DOCK_HEIGHT } from "../../PlayerDock";
import { PlaylistCard } from "../../PlaylistCard/PlaylistCard";
import { GRAY_300 } from "../../../styles";

const PlaylistsContainer = styled.div`
  max-height: calc(100vh - ${DOCK_HEIGHT} - 14rem);
  overflow-y: scroll;
  padding-top: 1rem;
  padding: 1rem 0rem;
  width: 56rem;
`;

const PlaylistsGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  padding: 1rem 0;
`;

const StyledHeader = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  font-size: 6rem;
`;

const PlaylistData = styled.h2`
  color: ${GRAY_300};
`;

export const Home = () => {
  const { playlists } = usePlaylist();
  const totalMinutes = playlists.reduce((total, playlist) => {
    const playlistDuration = playlist.tracks.reduce(
      (sum, track) => sum + track.duration,
      0
    );
    return total + playlistDuration;
  }, 0);
  return (
    <PlaylistsContainer>
      <StyledHeader>Playlists</StyledHeader>
      <PlaylistData>
        {playlists.length} Playlists • {Math.ceil(totalMinutes / 60)} min
      </PlaylistData>
      <PlaylistsGrid>
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} {...playlist} />
        ))}
      </PlaylistsGrid>
    </PlaylistsContainer>
  );
};
