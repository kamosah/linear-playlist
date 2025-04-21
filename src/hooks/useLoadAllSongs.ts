import { useEffect, useState } from "react";
import { Playlist, PreloadedAudio } from "../types";

type PlaylistTrackAudios = PreloadedAudio[];

export const useLoadAllSongs = ({
  playlists,
  audioRef,
}: {
  playlists: Playlist[];
  audioRef: React.RefObject<HTMLAudioElement>;
}) => {
  const [preloadedAudios, setPreloadedAudios] = useState<PlaylistTrackAudios[]>(
    []
  );
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState<boolean>(false);

  // Preload all tracks when component mounts
  useEffect(() => {
    // Create array to track loading status of each audio file
    const playlistAudioElements: PlaylistTrackAudios[] = playlists.map(
      (playlist) =>
        playlist.tracks.map(() => ({
          audio: new Audio(),
          loaded: false,
        }))
    );

    let loadedCount = 0;

    const totalTracks = playlists.reduce(
      (prev, playlist) => prev + playlist.tracks.length,
      0
    );

    // Set up each audio element with its respective track
    playlists.forEach((playlist, playlistIndex) =>
      playlist.tracks.forEach((track, trackIndex) => {
        const currentPlaylistAudio = playlistAudioElements[playlistIndex];
        const audioEl = currentPlaylistAudio[trackIndex].audio;

        audioEl.preload = "auto";
        audioEl.src = track.url;

        // Track loading progress
        audioEl.addEventListener("canplaythrough", () => {
          if (!currentPlaylistAudio[trackIndex].loaded) {
            currentPlaylistAudio[trackIndex].loaded = true;
            loadedCount++;

            // Update loading progress
            const progress = Math.round((loadedCount / totalTracks) * 100);
            setLoadingProgress(progress);

            // Set fully loaded status when all tracks are ready
            if (loadedCount === playlists.length) {
              setIsFullyLoaded(true);
            }
          }
        });

        // Start loading the audio
        audioEl.load();
      })
    );

    setPreloadedAudios(playlistAudioElements);

    // If playlist has at least one song, set the current audio reference
    if (playlists.length > 0 && playlistAudioElements.length > 0) {
      audioRef.current = playlistAudioElements[0][0].audio;
    }

    // Clean up on unmount
    return () => {
      playlistAudioElements.forEach((playlist) =>
        playlist.forEach((item) => {
          item.audio.pause();
          item.audio.src = "";
        })
      );
    };
  }, [playlists]);

  return {
    preloadedAudios,
    loadingProgress,
    isFullyLoaded,
  };
};
