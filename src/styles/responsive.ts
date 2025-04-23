export const BREAK_POINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
} as const;

export const mediaQueries = {
  mobile: `@media (min-width: ${BREAK_POINTS.mobile}px)`,
  tablet: `@media (min-width: ${BREAK_POINTS.tablet}px)`,
  desktop: `@media (min-width: ${BREAK_POINTS.desktop}px)`,
} as const;
