import { styled } from "styled-components";
import { INDIGO_700 } from "../../styles";

export const IconButton = styled.button<{ $isActive?: boolean }>`
  align-items: center;
  background: transparent;
  border-radius: 9999px;
  color: ${({ $isActive }) => ($isActive ? INDIGO_700 : "#cbd5e1")};
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.625rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #334155;
    color: ${({ $isActive }) => ($isActive ? INDIGO_700 : "#cbd5e1")};
  }

  &:focus {
    box-shadow: 0 0 0 4px #3b82f6;
    outline: none;
  }
`;
