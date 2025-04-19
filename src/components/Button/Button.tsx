import styled, { css } from "styled-components";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  size?: Size;
  variant?: Variant;
}

const sizeStyles = {
  sm: css`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: ${({ theme }) => theme.spacing.sm};
  `,
  md: css`
    font-size: ${({ theme }) => theme.fontSizes.md};
    padding: ${({ theme }) => theme.spacing.md};
  `,
  lg: css`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: ${({ theme }) => theme.spacing.lg};
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      background-color: ${({ theme }) => theme.colors.hover};
    }
  `,
  secondary: css`
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.hover};
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: none;
  display: inline-flex;
  font-weight: 600;
  justify-content: center;
  transition: all 0.2s ease;

  ${({ size = "md" }) => sizeStyles[size]}
  ${({ variant = "primary" }) => variantStyles[variant]}
`;
