import { cn } from '@/utils';
import type { DesignationVariant } from '@/types';
import type { DesignationNodeProps } from './DesignationNode.types';

const cardVariants: Record<DesignationVariant, string> = {
  default: 'bg-surface-lowest border-deep-blue-darkest text-text-grey-high',
  active: 'bg-deep-blue-darkest border-deep-blue-dark text-surface-lowest',
};

/** A single hierarchy node: a "Level N" caption stacked over a title card. */
export function DesignationNode({ level, label, variant = 'default' }: DesignationNodeProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="font-title text-caption font-medium text-text-grey-medium">Level {level}</p>
      <div
        className={cn(
          'flex h-control items-center justify-center gap-2 rounded-control border px-4 py-2.5',
          cardVariants[variant],
        )}
      >
        <span className="whitespace-nowrap font-title text-title font-medium">{label}</span>
      </div>
    </div>
  );
}
