import { cn } from '@/utils';
import type { TabBarProps } from './TabBar.types';

/** Underlined tab strip. Driven by a `tabs` array — no hardcoded tab markup. */
export function TabBar({ tabs, activeId, onChange, trailing }: TabBarProps) {
  return (
    <div className="flex w-full items-center justify-between border-b border-tab-divider bg-surface-brand-wash px-6 pt-2">
      <div role="tablist" aria-label="Designations views" className="flex items-start">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex items-center gap-2 rounded-t-card px-3 py-1.5 font-sans transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark',
                isActive
                  ? 'border-b-2 border-deep-blue-darkest bg-tab-divider text-label font-semibold text-deep-blue-darkest'
                  : 'border-b border-tab-divider text-body text-text-grey-muted hover:text-text-grey-medium-high',
              )}
            >
              <span aria-hidden className="inline-flex size-4 items-center justify-center">
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>
      {trailing}
    </div>
  );
}
