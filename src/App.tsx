import { styled } from "styled-components";
import { PlaylistPlayer, SidebarNavigation } from "./components";
import { PlayerDock } from "./components/PlayerDock";
import { playlists } from "./data/playlists.json";

const AppContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const App = () => {
  return (
    <AppContainer>
      <SidebarNavigation />
      <div className="flex justify-center w-full dark:bg-gray-950">
        <div className="w-4xl pt-2.5">
          <PlaylistPlayer playlist={playlists[0]} />
        </div>
      </div>
      <PlayerDock />
    </AppContainer>
  );
};

export default App;
