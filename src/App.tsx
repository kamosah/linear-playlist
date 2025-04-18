import { PlaylistPlayer, SidebarNavigation } from "./components";
import { playlists } from "./data/playlists.json";

function App() {
  return (
    <div className="flex">
      <SidebarNavigation />
      <div className="col-span-10 px-4">
        <PlaylistPlayer playlist={playlists[0]} />
      </div>
    </div>
  );
}

export default App;
