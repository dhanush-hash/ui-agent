import { NavLink } from 'react-router-dom';
import { cn } from '@/utils';
import {
  ArchiveIcon,
  ChartIcon,
  FileTextIcon,
  GearIcon,
  IdCardIcon,
  MegaphoneIcon,
  MonitorIcon,
  SparkleIcon,
  WorkflowIcon,
  WrenchIcon,
} from '@/assets/icons';
import type { SideNavItem, SideNavProps } from './SideNav.types';

const ICON_SIZE = 24;

/** Default module rail. Only routes that exist in the app carry a `to`. */
const DEFAULT_ITEMS: SideNavItem[] = [
  { id: 'insights', label: 'Insights', icon: <ChartIcon size={ICON_SIZE} /> },
  { id: 'clients', label: 'Clients', icon: <IdCardIcon size={ICON_SIZE} /> },
  { id: 'workflows', label: 'Workflows', icon: <WorkflowIcon size={ICON_SIZE} /> },
  { id: 'monitoring', label: 'Monitoring', icon: <MonitorIcon size={ICON_SIZE} /> },
  { id: 'settings', label: 'Settings', icon: <GearIcon size={ICON_SIZE} />, to: '/settings/designations' },
  { id: 'products', label: 'Products', icon: <ArchiveIcon size={ICON_SIZE} /> },
  { id: 'documents', label: 'Documents', icon: <FileTextIcon size={ICON_SIZE} /> },
  {
    id: 'language',
    label: 'Language Management',
    icon: <WrenchIcon size={ICON_SIZE} />,
    to: '/settings/language-management',
  },
  { id: 'campaigns', label: 'Campaigns', icon: <MegaphoneIcon size={ICON_SIZE} /> },
  { id: 'assistant', label: 'AI Assistant', icon: <SparkleIcon size={ICON_SIZE} /> },
];

const itemBase =
  'inline-flex size-11 items-center justify-center rounded-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue-dark';

/** Fixed-width icon rail down the left edge of the app shell. */
export function SideNav({ items = DEFAULT_ITEMS }: SideNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="flex w-sidenav shrink-0 flex-col items-center gap-2 border-r border-divider bg-surface-lowest py-4"
    >
      {items.map((item) =>
        item.to ? (
          <NavLink
            key={item.id}
            to={item.to}
            title={item.label}
            aria-label={item.label}
            className={({ isActive }) =>
              cn(
                itemBase,
                isActive
                  ? 'bg-deep-blue-wash text-deep-blue-darkest'
                  : 'text-text-grey-medium hover:bg-surface-medium hover:text-text-grey-high',
              )
            }
          >
            {item.icon}
          </NavLink>
        ) : (
          <button
            key={item.id}
            type="button"
            title={item.label}
            aria-label={item.label}
            className={cn(itemBase, 'text-text-grey-medium hover:bg-surface-medium hover:text-text-grey-high')}
          >
            {item.icon}
          </button>
        ),
      )}
    </nav>
  );
}
