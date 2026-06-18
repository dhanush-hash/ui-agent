import type { IconProps } from './types';

/** Language / translation glyph — used next to the translated-value column header. */
export function TranslateIcon({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
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
        d="M3 5h8M7 4v1.5c0 3.3-1.8 6-4 7M5 8c0 2 2 3.5 5 4"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20l4-9 4 9m-6.5-3h5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
