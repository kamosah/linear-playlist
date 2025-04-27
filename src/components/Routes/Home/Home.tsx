import { styled } from "styled-components";
import { usePlaylist } from "../../../hooks";
import { PlaylistCard } from "../../PlaylistCard/PlaylistCard";
import { GRAY_300 } from "../../../styles";
import { mediaQueries } from "../../../styles/responsive";

const PlaylistsContainer = styled.div`
  overflow-y: auto;
  padding-top: 1rem;
  padding: 1rem 0rem;
  width: 100%;

  ${mediaQueries.mobile} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  ${mediaQueries.tablet} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  ${mediaQueries.desktop} {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    max-width: 56rem;
  }
`;

const PlaylistsGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  padding: 1rem 0;
  grid-template-columns: 1fr;

  ${mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mediaQueries.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledHeader = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3rem;
  font-weight: 700;
  line-height: 6rem;
  white-space: nowrap;

  ${mediaQueries.tablet} {
    font-size: 4rem;
    line-height: 7rem;
  }
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
