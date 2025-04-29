import { styled } from "styled-components";

export const IconButton = styled.button<{ $isActive?: boolean }>`
  align-items: center;
  background: transparent;
  border-radius: 50%;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.secondary : theme.colors.text};
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.625rem;
  transition: background-color 0.2s ease;

  &:hover {
    color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.secondary : theme.colors.text};
  }

  &:focus {
    box-shadow: 0 0 0 4px #3b82f6;
    outline: none;
  }
`;
