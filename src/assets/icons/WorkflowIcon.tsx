import type { IconProps } from './types';

export function WorkflowIcon({ size = 24, color = 'currentColor', className, ...props }: IconProps) {
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
      <rect x={3} y={4} width={7} height={6} rx={1.5} stroke={color} strokeWidth={2} />
      <rect x={14} y={14} width={7} height={6} rx={1.5} stroke={color} strokeWidth={2} />
      <path d="M6.5 10v4a3 3 0 003 3H14" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
