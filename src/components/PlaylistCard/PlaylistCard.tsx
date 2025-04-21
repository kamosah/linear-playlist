import { styled } from "styled-components";
import type { Playlist } from "../../types";
import {
  GRAY_100,
  GRAY_200,
  GRAY_300,
  GRAY_400,
  GRAY_700,
  GRAY_800,
} from "../../styles";
import { Link } from "react-router-dom";

const PlaylistCardContainer = styled.div`
  /* TODO: Theme dependent */
  background-color: ${GRAY_800};
  border-color: ${GRAY_700};
  border-radius: ${({ theme }) => theme.border.lg};
  border: ${GRAY_200};
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  width: 100%;
`;

const PlaylistName = styled.h5`
  color: ${GRAY_100};
  font-size: 1.5rem;
  font-weight: 700;
  padding-bottom: 0.5rem;
`;

const PlaylistArtist = styled.p`
  color: ${GRAY_300};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PlaylistStats = styled.p`
  font-size: 1rem;
  color: ${GRAY_400};
`;

const PlaylistCardWrapper = styled.div`
  padding: 1.25rem;
`;

export const PlaylistCard: React.FC<Playlist> = ({
  artist,
  name,
  tracks,
  id,
}) => {
  const totalDuration = tracks.reduce(
    (prev, track) => prev + track.duration,
    0
  );
  return (
    <PlaylistCardContainer>
      <Link to={`playlist/${id}`}>
        <PlaylistCardWrapper>
          <PlaylistName>{name}</PlaylistName>
          <PlaylistArtist>{artist}</PlaylistArtist>
          <PlaylistStats>
            {tracks.length} Songs • {Math.ceil(totalDuration / 60)} min
          </PlaylistStats>
        </PlaylistCardWrapper>
      </Link>
    </PlaylistCardContainer>
  );
};
