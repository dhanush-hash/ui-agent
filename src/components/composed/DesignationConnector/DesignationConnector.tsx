import { cn } from '@/utils';

interface DesignationConnectorProps {
  /** Positioning classes that anchor the connector under its parent node. */
  className?: string;
}

/**
 * Decorative dashed L-connector linking a parent designation to the child one
 * level below-right. Rendered as SVG to match the Figma vector exactly. The
 * coordinates below are the connector's intrinsic geometry (its viewBox), not
 * layout values.
 */
export function DesignationConnector({ className }: DesignationConnectorProps) {
  return (
    <svg
      aria-hidden
      className={cn('pointer-events-none absolute text-connector', className)}
      width={60}
      height={98}
      viewBox="0 0 60 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 0 V86 H50"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray="2 4"
      />
      <path d="M49 81 L57 86 L49 91 Z" fill="currentColor" />
    </svg>
  );
}
