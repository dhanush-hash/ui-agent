import type { IconProps } from './types';

export function SearchIcon({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
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
      <circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} />
      <path d="M20 20l-3.5-3.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
