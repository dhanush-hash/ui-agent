import type { IconProps } from './types';

export function BellIcon({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
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
        d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.7 21a2 2 0 01-3.4 0" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
