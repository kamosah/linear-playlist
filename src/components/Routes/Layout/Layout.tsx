import { styled } from "styled-components";
import { PlayerDock } from "../../PlayerDock";
import { SidebarNavigation } from "../../Sidebar";
import { Outlet } from "react-router-dom";

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

const PlayerContainer = styled.div`
  grid-area: player;
`;

const SidebarContainer = styled.div`
  grid-area: sidebar;
`;

export const Layout = () => {
  return (
    <AppContainer>
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
