import React from "react";

import type { Playlist } from "../../types";
import { PlaylistList } from "../PlaylistList";
import { styled } from "styled-components";
import { GRAY_300 } from "../../styles";

type PlaylistPlayerProps = {
  playlist: Playlist;
};

const PlaylistSongsContainer = styled.div`
  padding-top: 1rem;
  width: 56rem;
`;

const StyledHeader = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  font-size: 6rem;
`;

const PlaylistData = styled.h2`
  color: ${GRAY_300};
`;

export const PlaylistPlayer: React.FC<PlaylistPlayerProps> = ({ playlist }) => {
  const totalDuration = playlist.tracks.reduce(
    (prev, track) => prev + track.duration,
    0
  );
  return (
    <PlaylistSongsContainer>
      <StyledHeader>{playlist.name}</StyledHeader>
      <PlaylistData>
        {playlist.tracks.length} Songs • {Math.ceil(totalDuration / 60)} min
      </PlaylistData>
      <PlaylistList
        artist={playlist.artist}
        name={playlist.name}
        tracks={playlist.tracks}
        year={playlist.year}
      />
    </PlaylistSongsContainer>
  );
};
