import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { HelpCircleIcon, MoreVerticalIcon, PlusIcon } from '@/assets/icons';

interface PageHeaderProps {
  /** Page title shown on the left. */
  title: string;
  /** Fired when the primary "Add Designation" CTA is pressed. */
  onAddDesignation: () => void;
  /** Fired when the overflow (kebab) button is pressed. */
  onMore: () => void;
}

/** Top chrome bar: title + help affordance on the left, primary actions on the right. */
export function PageHeader({ title, onAddDesignation, onMore }: PageHeaderProps) {
  return (
    <header className="flex h-header w-full items-center justify-between border-b border-divider bg-surface-lowest px-5">
      <div className="flex items-center gap-3">
        <h1 className="font-sans text-title text-text-grey-high">{title}</h1>
        <HelpCircleIcon className="text-text-grey-medium" size={16} />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          leftIcon={<PlusIcon size={16} />}
          onClick={onAddDesignation}
        >
          Add Designation
        </Button>
        <IconButton
          variant="outline"
          size="sm"
          aria-label="More options"
          icon={<MoreVerticalIcon size={24} />}
          onClick={onMore}
        />
      </div>
    </header>
  );
}
