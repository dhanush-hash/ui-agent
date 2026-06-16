/**
 * Joins truthy class name fragments into a single string.
 * A tiny, dependency-free alternative to `clsx` for conditional Tailwind classes.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
