import { styled } from "styled-components";
import { DOCK_HEIGHT, PlayerDock } from "../../PlayerDock";
import { SidebarNavigation } from "../../Sidebar";
import { Outlet } from "react-router-dom";
import { useAudioPlayer } from "../../../hooks";

const AppContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 18rem 1fr;
  grid-template-rows: 1fr 6rem;
  grid-template-areas:
    "sidebar main"
    "player player";
`;

const MainContainer = styled.div`
  display: flex;
  grid-area: main;
  justify-content: center;
  overflow-y: auto;
  padding: 1rem;
`;

const ErrorContainer = styled.div`
  background-color: red;
  border-radius: 0.5rem;
  color: white;
  height: 3rem;
  width: 15rem;
  position: fixed;
  padding: 0.5rem 1rem;
  top: 0;
  right: 0;
`;

const PlayerContainer = styled.div`
  grid-area: player;
`;

const SidebarContainer = styled.div`
  grid-area: sidebar;
`;

export const Layout = () => {
  const player = useAudioPlayer();
  return (
    <AppContainer>
      {player.error && <ErrorContainer>{player.error}</ErrorContainer>}
      <SidebarContainer>
        <SidebarNavigation />
      </SidebarContainer>
      <MainContainer>
        <Outlet />
      </MainContainer>
      <PlayerContainer>
        <PlayerDock />
      </PlayerContainer>
    </AppContainer>
  );
};
