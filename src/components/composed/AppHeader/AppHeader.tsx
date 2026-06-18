import { cn } from '@/utils';
import {
  BellIcon,
  ChevronDownIcon,
  GearIcon,
  HelpCircleIcon,
  SearchIcon,
  SparkleIcon,
} from '@/assets/icons';
import { Avatar } from '@/components/ui/Avatar';
import type { AppHeaderProps } from './AppHeader.types';

const noop = () => {};

/** Square brand mark standing in for the FYNXT logo symbol. */
function BrandMark() {
  return (
    <span className="inline-flex size-6 items-center justify-center rounded-control bg-deep-blue-darkest font-title text-body font-semibold text-surface-lowest">
      X
    </span>
  );
}

function PlainIconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-control text-text-grey-medium-high transition-colors hover:bg-surface-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark"
    >
      {children}
    </button>
  );
}

/**
 * Global application top bar: brand + workspace switcher on the left, search,
 * Ask AI, utility icons, and the user avatar on the right. Spans the full width
 * above the side navigation.
 */
export function AppHeader({
  viewName = 'Yellowstone',
  switchViewLabel = 'Switch to FI View',
  userName = 'Account',
  userAvatarSrc,
  onSwitchView = noop,
  onOpenViewSwitcher = noop,
  onSearch = noop,
  onAskAi = noop,
  onHelp = noop,
  onSettings = noop,
  onNotifications = noop,
  onProfile = noop,
}: AppHeaderProps) {
  return (
    <header className="flex h-topbar w-full items-center gap-4 border-b border-divider bg-surface-lowest px-6">
      <BrandMark />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenViewSwitcher}
          aria-haspopup="listbox"
          className="flex h-control min-w-40 items-center justify-between gap-3 rounded-control border border-outline-medium px-3 font-sans text-body text-text-grey-high transition-colors hover:bg-surface-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark"
        >
          <span className="truncate">{viewName}</span>
          <ChevronDownIcon size={20} className="shrink-0 text-text-grey-medium" />
        </button>
        <button
          type="button"
          onClick={onSwitchView}
          className="whitespace-nowrap font-sans text-body font-medium text-link transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark"
        >
          {switchViewLabel}
        </button>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          aria-label="Search"
          onClick={onSearch}
          className="inline-flex size-11 items-center justify-center rounded-control border border-outline-medium text-text-grey-medium-high transition-colors hover:bg-surface-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark"
        >
          <SearchIcon size={20} />
        </button>

        <button
          type="button"
          onClick={onAskAi}
          className={cn(
            'inline-flex h-11 items-center gap-2 rounded-control border border-outline-medium px-4',
            'font-title text-body font-medium text-text-grey-high transition-colors hover:bg-surface-low',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark',
          )}
        >
          <SparkleIcon size={20} className="text-link" />
          <span className="tracking-wide">ASK AI</span>
        </button>

        <PlainIconButton label="Help" onClick={onHelp}>
          <HelpCircleIcon size={20} />
        </PlainIconButton>
        <PlainIconButton label="Settings" onClick={onSettings}>
          <GearIcon size={20} />
        </PlainIconButton>
        <PlainIconButton label="Notifications" onClick={onNotifications}>
          <BellIcon size={20} />
        </PlainIconButton>

        <button
          type="button"
          aria-label={`${userName} — account menu`}
          onClick={onProfile}
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark focus-visible:ring-offset-1"
        >
          <Avatar name={userName} src={userAvatarSrc} size="md" />
        </button>
      </div>
    </header>
  );
}
