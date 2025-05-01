import { styled } from "styled-components";
import { DOCK_HEIGHT, PlayerDock } from "../../PlayerDock";
import { SidebarNavigation } from "../../Sidebar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useAudioPlayer } from "../../../hooks";

const AppContainer = styled.div<{ $isPlaylistSelected: boolean }>`
  display: grid;
  height: 100vh;
  grid-template-columns: 18rem 1fr;
  grid-template-rows: ${({ $isPlaylistSelected }) =>
    $isPlaylistSelected ? "1fr 6rem" : "1fr"};
  grid-template-areas:
    "sidebar main"
    "player player";
  transition: grid-template-rows 0.8s ease-in-out; /* Synchronize with Framer Motion */
`;

const MainContainer = styled.div`
  display: flex;
  grid-area: main;
  justify-content: center;
  overflow-y: auto;
  padding: 1rem;
`;

const PlayerContainer = styled(motion.div)`
  grid-area: player;
`;

const SidebarContainer = styled.div<{ $isPlaylistSelected: boolean }>`
  grid-area: sidebar;
  height: ${({ $isPlaylistSelected }) =>
    $isPlaylistSelected ? `calc(100vh - ${DOCK_HEIGHT})` : "100vh"};
`;

export const Layout = () => {
  const playerDockVariants = {
    hidden: { display: "none", y: "100%" },
    visible: { display: "block", y: 0 },
  };
  const player = useAudioPlayer();
  const isPlaylistSelected = Boolean(player.playlist);
  return (
    <AppContainer $isPlaylistSelected={isPlaylistSelected}>
      <SidebarContainer $isPlaylistSelected={isPlaylistSelected}>
        <SidebarNavigation />
      </SidebarContainer>
      <MainContainer>
        <Outlet />
      </MainContainer>
      {isPlaylistSelected && (
        <PlayerContainer
          initial="hidden"
          animate={isPlaylistSelected ? "visible" : "hidden"}
          variants={playerDockVariants}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <PlayerDock />
        </PlayerContainer>
      )}
    </AppContainer>
  );
};
