import type { IconProps } from './types';

export function ChartIcon({ size = 24, color = 'currentColor', className, ...props }: IconProps) {
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
      <rect x={3} y={4} width={18} height={14} rx={2} stroke={color} strokeWidth={2} />
      <path d="M7 14l3-3 2 2 4-5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
