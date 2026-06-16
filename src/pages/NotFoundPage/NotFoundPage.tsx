import { Link } from 'react-router-dom';

/** Fallback page for unmatched routes. */
export function NotFoundPage() {
  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="font-title text-title font-semibold text-text-grey-high">Page not found</h1>
      <p className="font-sans text-body text-text-grey-medium-high">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/settings/designations"
        className="font-sans text-body text-deep-blue-dark underline-offset-2 hover:underline"
      >
        Go to Designations
      </Link>
    </main>
  );
}
