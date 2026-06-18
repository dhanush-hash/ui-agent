import type { IconProps } from './types';

export function WrenchIcon({ size = 24, color = 'currentColor', className, ...props }: IconProps) {
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
        d="M14.7 6.3a4 4 0 00-5.2 5l-6 6a1.8 1.8 0 002.5 2.5l6-6a4 4 0 005-5.2l-2.6 2.6-2.3-.6-.6-2.3 2.6-2.6z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
