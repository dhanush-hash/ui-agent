/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the Language Translation Service API, e.g. http://localhost:8080 */
  readonly VITE_API_BASE_URL?: string;
  /** Tenant identifier sent as the X-Tenant-Id header. */
  readonly VITE_API_TENANT_ID?: string;
  /** Authenticated user id sent as the X-User-Id header. */
  readonly VITE_API_USER_ID?: string;
  /** Comma-separated user roles sent as the X-User-Roles header. */
  readonly VITE_API_USER_ROLES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
