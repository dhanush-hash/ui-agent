import type { IconProps } from './types';

export function CloseIcon({ size = 16, color = 'currentColor', className, ...props }: IconProps) {
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
      <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
