export type Track = {
  duration: number;
  id: number;
  name: string;
  url: string;
};

export type Playlist = {
  id: number;
  name: string;
  artist: string;
  year: number;
  tracks: Track[];
};
