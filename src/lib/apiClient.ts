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

function buildHeaders(): Headers {
  const headers = new Headers({ 'Content-Type': 'application/json' });

  const tenantId = import.meta.env.VITE_API_TENANT_ID;
  const userId = import.meta.env.VITE_API_USER_ID;
  const userRoles = import.meta.env.VITE_API_USER_ROLES;

  // Required by the spec for every /assets request (multi-tenancy + authorization).
  if (tenantId) headers.set('X-Tenant-Id', tenantId);
  if (userId) headers.set('X-User-Id', userId);
  if (userRoles) headers.set('X-User-Roles', userRoles);

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
