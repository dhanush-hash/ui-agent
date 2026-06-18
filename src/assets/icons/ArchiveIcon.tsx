import type { IconProps } from './types';

export function ArchiveIcon({ size = 24, color = 'currentColor', className, ...props }: IconProps) {
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
      <rect x={3} y={4} width={18} height={4} rx={1} stroke={color} strokeWidth={2} />
      <path d="M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12h4" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
