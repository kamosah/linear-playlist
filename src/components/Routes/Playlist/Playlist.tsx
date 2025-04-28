import { useParams } from "react-router-dom";
import { useAudioPlayer, usePlaylist } from "../../../hooks";
import { PlaylistList } from "../../PlaylistList";
import { styled } from "styled-components";
import { GRAY_500 } from "../../../styles";
import { mediaQueries } from "../../../styles/responsive";
import { OverflowWrapper } from "../..";

const PlaylistSongsContainer = styled.div`
  padding-top: 1rem;
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

const StyledHeader = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 3rem;
  font-weight: 700;
  line-height: 6rem;

  ${mediaQueries.tablet} {
    font-size: 4rem;
    line-height: 7rem;
  }
`;

const PlaylistData = styled.h3`
  color: ${GRAY_500};
  padding-bottom: 1rem;
`;

const StyledSubheader = styled.h2`
  color: ${({ theme }) => theme.colors.text};
`;

export const Playlist = () => {
  const { id } = useParams() as { id: string };
  const { playlists } = usePlaylist();
  const player = useAudioPlayer();
  const playlist = playlists.find((playlist) => playlist.id === +id)!;
  const totalDuration = (playlist?.tracks || []).reduce(
    (prev, track) => prev + track.duration,
    0
  );

  if (!playlist) {
    player.setPlaylist(playlists[+id - 1]);
  }

  return (
    <PlaylistSongsContainer>
      <StyledSubheader>Playlist</StyledSubheader>
      <OverflowWrapper>
        <StyledHeader>{playlist?.name}</StyledHeader>
      </OverflowWrapper>
      <PlaylistData>
        {playlist?.year} • {playlist?.tracks.length} Songs,{" "}
        {Math.ceil(totalDuration / 60)} min
      </PlaylistData>
      <PlaylistList {...playlist} />
    </PlaylistSongsContainer>
  );
};
