import type { IconProps } from './types';

export function IdCardIcon({ size = 24, color = 'currentColor', className, ...props }: IconProps) {
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
      <rect x={3} y={5} width={18} height={14} rx={2} stroke={color} strokeWidth={2} />
      <circle cx={8.5} cy={11} r={2} stroke={color} strokeWidth={2} />
      <path d="M5.5 16c.5-1.5 1.7-2.2 3-2.2s2.5.7 3 2.2M14 10h4M14 13.5h3" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
