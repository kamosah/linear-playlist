import { Play } from "lucide-react";
import type { Playlist, Track } from "../../types";
import { formatTime } from "../../utils";

type PlaylistItem = {
  artist: string;
} & Track;

export const PlaylistListItem: React.FC<PlaylistItem> = ({
  artist,
  duration,
  name,
  url,
}) => {
  return (
    <li className="">
      <a
        href="#"
        className="group relative flex flex-col text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <div className="grid grid-cols-12 p-1">
          <div className="col-span-11 grid grid-rows-2">
            <div className="ps-3 py-1 text-sm truncate">{name}</div>
            <div className="ps-3 py-1 text-gray-500 text-xs truncate">
              {artist}
            </div>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Play />
            </span>
          </div>
          <div className="group-hover:opacity-0 col-span-1 flex flex-col justify-center">
            <p className="text-gray-500 text-end">{formatTime(duration)}</p>
          </div>
        </div>
      </a>
    </li>
  );
};

export const PlaylistList: React.FC<Playlist> = ({ name: artist, tracks }) => {
  return (
    <ul className="w-full">
      {tracks.map((track) => (
        <PlaylistListItem key={track.name} artist={artist} {...track} />
      ))}
    </ul>
  );
};
