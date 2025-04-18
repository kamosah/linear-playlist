export type Track = {
  duration: number;
  name: string;
  url: string;
};

export type Playlist = {
  name: string;
  artist: string;
  year: number;
  tracks: Track[];
};
