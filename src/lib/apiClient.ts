/**
 * Shared API client for the Language Translation Service.
 *
 * A dependency-free `fetch` wrapper that mirrors the responsibilities of the
 * axios client in the integration guidelines: it reads the base URL and the
 * required multi-tenancy headers from environment variables, injects a bearer
 * token when one is present, and normalises HTTP failures into `Error` objects
 * so hooks can surface `isError` / `error.message` without catching internally.
 *
 * Base URL and tenant/user context come from env vars only — never hardcoded.
 */

type QueryPrimitive = string | number | boolean;
export type QueryParams = Record<string, QueryPrimitive | QueryPrimitive[] | null | undefined>;

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

function buildUrl(path: string, params?: QueryParams): string {
  const origin = BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  const url = new URL(`${BASE_URL}${path}`, origin);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      if (Array.isArray(value)) {
        value.forEach((item) => url.searchParams.append(key, String(item)));
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

/**
 * Required request context, derived from the OpenAPI spec: every Assets endpoint
 * declares these three headers as `required: true`. Each maps to the env var that
 * supplies its value. The spec defines no `securitySchemes`/bearer token, so the
 * Authorization header is treated as optional and forwarded only when present.
 */
const REQUIRED_HEADERS: ReadonlyArray<{
  header: string;
  envVar: string;
  read: () => string | undefined;
}> = [
  { header: 'X-Tenant-Id', envVar: 'VITE_API_TENANT_ID', read: () => import.meta.env.VITE_API_TENANT_ID },
  { header: 'X-User-Id', envVar: 'VITE_API_USER_ID', read: () => import.meta.env.VITE_API_USER_ID },
  { header: 'X-User-Roles', envVar: 'VITE_API_USER_ROLES', read: () => import.meta.env.VITE_API_USER_ROLES },
];

export interface MissingApiConfig {
  /** The HTTP header the API expects. */
  header: string;
  /** The env var that supplies it. */
  envVar: string;
}

/** Thrown before a request when required API configuration is absent. */
export class ApiConfigError extends Error {
  readonly missing: MissingApiConfig[];
  constructor(missing: MissingApiConfig[]) {
    super(
      `Missing required API configuration: ${missing
        .map((m) => `${m.envVar} (${m.header})`)
        .join(', ')}. Set these in .env.local and restart the dev server.`,
    );
    this.name = 'ApiConfigError';
    this.missing = missing;
  }
}

/**
 * Detects which spec-required headers have no configured value. Returns an empty
 * array when the client is fully configured — callers can use this for onboarding
 * UI or a preflight check.
 */
export function getMissingApiConfig(): MissingApiConfig[] {
  return REQUIRED_HEADERS.filter(({ read }) => !read()?.trim()).map(({ header, envVar }) => ({
    header,
    envVar,
  }));
}

function buildHeaders(): Headers {
  const headers = new Headers({ 'Content-Type': 'application/json' });

  for (const { header, read } of REQUIRED_HEADERS) {
    const value = read()?.trim();
    if (value) headers.set(header, value);
  }

  // No bearer scheme in the spec, but forward a token when one is present so the
  // client keeps working if the API adds auth later.
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

async function normaliseError(response: Response): Promise<Error> {
  let message = `Request failed with status ${response.status}`;
  try {
    const body = (await response.json()) as { message?: string; error?: string };
    message = body.message ?? body.error ?? message;
  } catch {
    // Non-JSON error body — keep the status-based message.
  }
  return new Error(message);
}

export interface ApiGetOptions {
  params?: QueryParams;
  signal?: AbortSignal;
}

/** Performs a typed GET request against the configured API base URL. */
export async function apiGet<T>(path: string, options?: ApiGetOptions): Promise<T> {
  // Detect missing required context up front so the failure is actionable
  // ("set VITE_API_TENANT_ID…") instead of an opaque server rejection.
  const missing = getMissingApiConfig();
  if (missing.length > 0) {
    throw new ApiConfigError(missing);
  }

  const response = await fetch(buildUrl(path, options?.params), {
    method: 'GET',
    headers: buildHeaders(),
    signal: options?.signal,
  });

  if (!response.ok) {
    throw await normaliseError(response);
  }

  return (await response.json()) as T;
}
