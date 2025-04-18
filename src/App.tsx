import { PlaylistPlayer } from "./components";
import { playlists } from "./data/playlists.json";

function App() {
  return (
    <>
      <PlaylistPlayer playlist={playlists[0]} />
    </>
  );
}

export default App;
