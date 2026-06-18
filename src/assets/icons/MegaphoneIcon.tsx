import type { IconProps } from './types';

export function MegaphoneIcon({ size = 24, color = 'currentColor', className, ...props }: IconProps) {
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
        d="M4 10v4a2 2 0 002 2h2l8 4V4l-8 4H6a2 2 0 00-2 2z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M8 16v3a1.5 1.5 0 003 0v-2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
