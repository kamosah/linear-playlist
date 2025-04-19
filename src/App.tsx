import { PlaylistPlayer, SidebarNavigation } from "./components";
import { PlayerDock } from "./components/PlayerDock";
import { playlists } from "./data/playlists.json";

function App() {
  return (
    <div className="flex w-full">
      <SidebarNavigation />
      <div className="flex justify-center w-full dark:bg-gray-950">
        <div className="w-4xl pt-2.5">
          <PlaylistPlayer playlist={playlists[0]} />
        </div>
      </div>
      <PlayerDock />
    </div>
  );
}

export default App;
