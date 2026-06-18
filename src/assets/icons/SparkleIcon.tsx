import type { IconProps } from './types';

export function SparkleIcon({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
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
        d="M12 3l1.8 4.9c.3.8.5 1 1.3 1.3L20 11l-4.9 1.8c-.8.3-1 .5-1.3 1.3L12 19l-1.8-4.9c-.3-.8-.5-1-1.3-1.3L4 11l4.9-1.8c.8-.3 1-.5 1.3-1.3L12 3z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <path d="M19 4.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6z" fill={color} />
    </svg>
  );
}
