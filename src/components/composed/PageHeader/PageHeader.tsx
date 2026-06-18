import type { ReactNode } from 'react';
import { ArrowLeftIcon, HelpCircleIcon } from '@/assets/icons';

interface PageHeaderProps {
  /** Page title shown on the left. */
  title: string;
  /** When provided, renders a back-navigation arrow before the title. */
  onBack?: () => void;
  /** Shows the help affordance next to the title. */
  showHelp?: boolean;
  /** Right-aligned action slot — primary CTA, overflow menu, etc. */
  actions?: ReactNode;
}

/** Top chrome bar for a page: optional back arrow + title (+ help) on the left, actions on the right. */
export function PageHeader({ title, onBack, showHelp = false, actions }: PageHeaderProps) {
  return (
    <header className="flex h-header w-full items-center justify-between border-b border-divider bg-surface-lowest px-5">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            aria-label="Go back"
            onClick={onBack}
            className="inline-flex size-6 items-center justify-center rounded-control text-text-grey-high transition-colors hover:bg-surface-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark"
          >
            <ArrowLeftIcon size={24} />
          </button>
        )}
        <h1 className="font-sans text-title text-text-grey-high">{title}</h1>
        {showHelp && <HelpCircleIcon className="text-text-grey-medium" size={16} />}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
