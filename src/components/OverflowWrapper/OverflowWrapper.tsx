import React from "react";
import styled from "styled-components";

interface OverflowWrapperProps {
  children: React.ReactNode;
}

const StyledOverflowWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const OverflowWrapper: React.FC<OverflowWrapperProps> = ({
  children,
}) => {
  return <StyledOverflowWrapper>{children}</StyledOverflowWrapper>;
};

export default OverflowWrapper;
