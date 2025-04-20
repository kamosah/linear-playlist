import { House, Play } from "lucide-react";
import { playlists } from "../../data/playlists.json";
import { styled } from "styled-components";
import { GRAY_100, GRAY_500, GRAY_800 } from "../../styles";
import { Link, useParams } from "react-router-dom";

const SidebarContainer = styled.aside`
  /* TODO: Responsive */
  border-right: 1px solid ${GRAY_500};
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

const SidebarHeadList = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  width: 100%;
`;

const SidebarHeadItem = styled.li`
  border-radius: ${({ theme }) => theme.border.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding-inline-start: ${({ theme }) => theme.spacing.xs};
  padding: 1rem;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const SidebarNavItem = styled.li<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) => $isActive && GRAY_800};
  border-radius: ${({ theme }) => theme.border.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem 1rem;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const SidebarNavList = styled.ul`
  border-top: 1px solid ${GRAY_100};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  width: 100%;
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

const StyledHeaderText = styled.span`
  font-size: 1em;
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

const SidebarHeadItemWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const SidebarNavigation = () => {
  const { id } = useParams() as { id: string };
  return (
    <SidebarContainer aria-label="Sidebar">
      <SidebarSection>
        <SidebarHeadList>
          <SidebarHeadItem>
            <Link to="/">
              <SidebarHeadItemWrapper>
                <House
                  style={{
                    display: "inline",
                    fontSize: "0.875rem",
                  }}
                  size="1em"
                />
                <StyledHeaderText>Home</StyledHeaderText>
              </SidebarHeadItemWrapper>
            </Link>
          </SidebarHeadItem>
        </SidebarHeadList>

        <SidebarNavList>
          {playlists.map((playlist) => (
            <SidebarNavItem
              key={playlist.ID}
              $isActive={+id === playlist.ID}
              className="group relative"
            >
              <Link to={`/playlist/${playlist.ID}`}>
                <SidebarNavItemText>{playlist.name}</SidebarNavItemText>
                <SidebarNavItemCaption>{playlist.artist}</SidebarNavItemCaption>
                {/* Remove: Tailwind group hover if possible */}
                <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play />
                </span>
              </Link>
            </SidebarNavItem>
          ))}
        </SidebarNavList>
      </SidebarSection>
    </SidebarContainer>
  );
};
