import { styled } from "styled-components";
import { DOCK_HEIGHT } from "../../PlayerDock";
import { PlaylistContextProvider } from "../../../context";
import { SidebarNavigation } from "../../Sidebar";
import { Outlet } from "react-router-dom";

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
    <PlaylistContextProvider>
      <AppContainer>
        <SidebarNavigation />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </AppContainer>
    </PlaylistContextProvider>
  );
};
