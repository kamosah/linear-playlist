import { House, Play } from "lucide-react";
import { playlists } from "../../data/playlists.json";
import { styled } from "styled-components";
import { GRAY_100 } from "../../styles";

const SidebarContainer = styled.aside`
  /* TODO: Responsive */
  border-right: 1px solid white;
  height: 100vh;
  width: 18rem;
`;

const SidebarSection = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  height: 100%;
  overflow-y: auto;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: inherit;
`;

const SidebarHead = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  width: 100%;
  display: flex;
  :hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const StyledText = styled.span`
  padding-inline-start: 0.5rem;
`;

const SidebarHeadItem = styled.li`
  align-items: center;
  border-radius: ${({ theme }) => theme.border.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  width: 100%;
`;

const SidebarNavItem = styled.li`
  border-radius: ${({ theme }) => theme.border.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem 1rem;
  width: 100%;
`;

const SidebarNavList = styled.ul`
  border-top: 1px solid ${GRAY_100};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  width: 100%;
  :hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const SidebarNavItemText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SidebarNavItemCaption = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SidebarNavigation = () => {
  return (
    <SidebarContainer aria-label="Sidebar">
      <SidebarSection>
        <SidebarHead>
          <SidebarHeadItem>
            <House size="1em" />
            <StyledText>Home</StyledText>
          </SidebarHeadItem>
        </SidebarHead>

        <SidebarNavList>
          {playlists.map((playlist) => (
            <SidebarNavItem className="group relative" key={playlist.name}>
              <SidebarNavItemText>{playlist.name}</SidebarNavItemText>
              <SidebarNavItemCaption>{playlist.artist}</SidebarNavItemCaption>
              {/* Remove: Tailwind group hover if possible */}
              <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play />
              </span>
            </SidebarNavItem>
          ))}
        </SidebarNavList>
      </SidebarSection>
    </SidebarContainer>
  );
};
