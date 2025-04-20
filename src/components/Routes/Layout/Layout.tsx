import { styled } from "styled-components";
import { DOCK_HEIGHT, PlayerDock } from "../../PlayerDock";
import { SidebarNavigation } from "../../Sidebar";
import { Outlet } from "react-router-dom";
import { usePlaylist } from "../../../hooks";

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

export const Layout = () => {
  return (
    <AppContainer>
      <SidebarNavigation />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <PlayerDock />
    </AppContainer>
  );
};
