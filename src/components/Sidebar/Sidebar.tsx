import { House, Play } from "lucide-react";
import { playlists } from "../../data/playlists.json";

export const SidebarNavigation = () => {
  return (
    <aside className="w-2xs h-screen" aria-label="Sidebar">
      <div className="h-full px-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 w-full">
        <ul className="space-y-2 font-medium py-4">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <House />
              <span className="ms-3">Home</span>
            </a>
          </li>
        </ul>

        <ul className="space-y-2 font-medium border-t dark:border-gray-700 py-4">
          {playlists.map((playlist) => (
            <li>
              <a
                href="#"
                className="group relative flex flex-col p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="ms-3 text-sm truncate">{playlist.name}</div>
                <div className="ms-3 text-gray-500 text-xs truncate">
                  {playlist.artist}
                </div>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
