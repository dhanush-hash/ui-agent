import type { SVGProps } from 'react';

/** Shared props for every SVGR-style icon component in this folder. */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'color'> {
  /** Rendered width and height in pixels. */
  size?: number;
  /** Stroke/fill colour. Defaults to `currentColor` so icons inherit text colour. */
  color?: string;
  /** Accessible label. When omitted the icon is treated as decorative (`aria-hidden`). */
  'aria-label'?: string;
}
