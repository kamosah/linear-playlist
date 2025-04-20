import { styled } from "styled-components";
import { PlaylistPlayer, SidebarNavigation } from "./components";
import { DOCK_HEIGHT, PlayerDock } from "./components/PlayerDock";
import { playlists } from "./data/playlists.json";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: calc(${DOCK_HEIGHT} + 1.5rem);
  padding-top: 1.5rem;
  width: 100%;
`;

export const App = () => {
  return (
    <AppContainer>
      <SidebarNavigation />
      <MainContainer>
        <PlaylistPlayer playlist={playlists[0]} />
      </MainContainer>
      {/* TODO: Add global state info with hooks */}
      <PlayerDock />
    </AppContainer>
  );
};

export default App;
