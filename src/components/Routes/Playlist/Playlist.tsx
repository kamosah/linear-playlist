import { useParams } from "react-router-dom";
import { usePlaylist } from "../../../hooks";
import { PlaylistList } from "../../PlaylistList";
import { styled } from "styled-components";
import { GRAY_500 } from "../../../styles";

const PlaylistSongsContainer = styled.div`
  padding-top: 1rem;
  width: 56rem;
`;

const StyledHeader = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 6rem;
  font-weight: 700;
  line-height: 8rem;
`;

const PlaylistData = styled.h2`
  color: ${GRAY_500};
  padding-bottom: 1rem;
`;

const StyledSubheader = styled.h2`
  color: ${({ theme }) => theme.colors.text};
`;

export const Playlist = () => {
  const { id } = useParams() as { id: string };
  const { playlists } = usePlaylist();
  const playlist = playlists.find((playlist) => playlist.id === +id)!;
  const totalDuration = playlist.tracks.reduce(
    (prev, track) => prev + track.duration,
    0
  );
  // TODO: Add error handling for routes
  if (!playlist) throw new Error("Invalid Playlist ID");

  return (
    <PlaylistSongsContainer>
      <StyledSubheader>Playlist</StyledSubheader>
      <StyledHeader>{playlist.name}</StyledHeader>
      <PlaylistData>
        {playlist.year} • {playlist.tracks.length} Songs,{" "}
        {Math.ceil(totalDuration / 60)} min
      </PlaylistData>
      <PlaylistList {...playlist} />
    </PlaylistSongsContainer>
  );
};
