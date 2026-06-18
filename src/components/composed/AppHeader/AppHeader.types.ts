export interface AppHeaderProps {
  /** Name of the active workspace/view shown in the switcher. */
  viewName?: string;
  /** Label for the secondary view-switch link. */
  switchViewLabel?: string;
  /** Signed-in user's display name (avatar alt + initials fallback). */
  userName?: string;
  /** Optional avatar image URL. */
  userAvatarSrc?: string;
  onSwitchView?: () => void;
  onOpenViewSwitcher?: () => void;
  onSearch?: () => void;
  onAskAi?: () => void;
  onHelp?: () => void;
  onSettings?: () => void;
  onNotifications?: () => void;
  onProfile?: () => void;
}
