import { styled } from "styled-components";
import type { Playlist } from "../../types";
import { GRAY_400, GRAY_700 } from "../../styles";
import { Link } from "react-router-dom";
import { OverflowWrapper } from "..";

const PlaylistCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-color: ${GRAY_700};
  border-radius: ${({ theme }) => theme.border.lg};
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const PlaylistName = styled.h5`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  font-weight: 700;
  padding-bottom: 0.5rem;
`;

const PlaylistArtist = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PlaylistStats = styled.p`
  color: ${GRAY_400};
  font-size: 1rem;
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
    <PlaylistCardContainer data-testid="playlist-card">
      <Link to={`playlist/${id}`}>
        <PlaylistCardWrapper>
          <OverflowWrapper>
            <PlaylistName>{name}</PlaylistName>
          </OverflowWrapper>
          <OverflowWrapper>
            <PlaylistArtist>{artist}</PlaylistArtist>
          </OverflowWrapper>
          <PlaylistStats>
            {tracks.length} Songs • {Math.ceil(totalDuration / 60)} min
          </PlaylistStats>
        </PlaylistCardWrapper>
      </Link>
    </PlaylistCardContainer>
  );
};
