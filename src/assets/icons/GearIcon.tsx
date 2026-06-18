import type { IconProps } from './types';

export function GearIcon({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
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
      <circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
      <path
        d="M12 2.5l1.4 2.2 2.6-.5.5 2.6 2.2 1.4-1.2 2.3 1.2 2.3-2.2 1.4-.5 2.6-2.6-.5L12 21.5l-1.4-2.2-2.6.5-.5-2.6L5.3 15.8 6.5 13.5 5.3 11.2l2.2-1.4.5-2.6 2.6.5L12 2.5z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  );
}
