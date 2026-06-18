import type { IconProps } from './types';

/** Bidirectional sort glyph — an up arrow and a down arrow side by side. */
export function SortIcon({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={!props['aria-label']}
      {...props}
    >
      <path
        d="M8 4v16m0 0l-3-3m3 3l3-3M16 20V4m0 0l-3 3m3-3l3 3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
