import type { IconProps } from './types';

/** Org-hierarchy / dataflow glyph used by the Designations tab. */
export function DataflowIcon({ size = 16, color = 'currentColor', className, ...props }: IconProps) {
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
      <rect x={9} y={3} width={6} height={5} rx={1} stroke={color} strokeWidth={2} />
      <rect x={3} y={16} width={6} height={5} rx={1} stroke={color} strokeWidth={2} />
      <rect x={15} y={16} width={6} height={5} rx={1} stroke={color} strokeWidth={2} />
      <path
        d="M12 8v4m0 0H6v4m6-4h6v4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
