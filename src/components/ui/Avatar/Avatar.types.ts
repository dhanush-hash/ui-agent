export type AvatarSize = 'sm' | 'md';

export interface AvatarProps {
  /** Display name — used for the alt text and the initials fallback. */
  name: string;
  /** Optional image URL. When absent, initials are shown. */
  src?: string;
  /** Size scale — `sm` is 32px, `md` is 44px. */
  size?: AvatarSize;
  className?: string;
}
