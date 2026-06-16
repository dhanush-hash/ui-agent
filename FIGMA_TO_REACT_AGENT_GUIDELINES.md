# Figma → React Code Generation Guidelines

> **Universal agent instruction set** for converting Figma designs to production-grade React code.
> Works with: GitHub Copilot, Claude Code, Cursor, Codeium, Windsurf, ChatGPT, Gemini, or any AI coding agent.
> **Every rule in this file applies unconditionally. No exceptions. No shortcuts.**

---

## How to Wire This File to Your Agent

| Agent | Instruction File | Where to Place It |
|---|---|---|
| **GitHub Copilot** | `.github/copilot-instructions.md` | Project root |
| **Claude Code** | `CLAUDE.md` | Project root |
| **Cursor** | `.cursor/rules/*.mdc` or `.cursorrules` | Project root |
| **Windsurf** | `.windsurfrules` | Project root |
| **Codeium** | `.codeiumrules` | Project root |
| **Any agent (universal)** | Reference this file in your prompt | e.g. `@docs/FIGMA_TO_REACT_AGENT_GUIDELINES.md implement this layer` |

**Minimal config content:**
```
Before generating any React code from Figma, read and follow every rule in:
docs/FIGMA_TO_REACT_AGENT_GUIDELINES.md
Do not skip any section. Apply the pattern decision matrix on every component.
```

---

## 0. Screen Context Check — MANDATORY FIRST STEP

**Before doing anything else, the agent must ask:**

> "Is this a **modification to an existing screen** or a **new screen**?"

The agent must wait for a clear answer before proceeding.

---

### If the answer is: MODIFICATION TO AN EXISTING SCREEN

1. **Locate the existing component file(s)** — do not create new files.
2. **Edit only what has changed** — preserve all existing props, logic, and structure.
3. **Make surgical edits** — one change, one place. Update all files affected by a shared component change.
4. **Do not rename or move files** unless explicitly instructed.
5. Run the **Code Quality Checklist (Section 11)** before finalising.

> **Hard rule:** If the screen already has a component — edit it. Never scaffold a new component for an existing screen.

---

### If the answer is: NEW SCREEN

1. **Confirm the route** — Ask: "What route path should this page live at (e.g. `/dashboard`, `/settings/profile`)?" If the user does not provide one, infer a sensible slug from the Figma frame name and state it explicitly before proceeding: _"I'll register this at `/inferred-path` — let me know if you want a different path."_
2. **Check the codebase first** — search `src/components/` for any existing component that matches what Figma shows before building new. Reuse atoms and composed components where they already exist.
3. Run the full **Pre-Generation Checklist (Section 0.1)**.
4. Apply the **Pattern Decision Matrix (Section 2)** to every component.
5. Build all new components in the correct folder locations (Section 1).
6. **Register the route** — Add the new page to the router file as part of the same output (Section 1.1). Never deliver a new page without its route entry.
7. Create barrel `index.ts` exports for every new component folder.
8. Run the **Code Quality Checklist (Section 14)** before finalising.

---

### Ambiguous Answers

If the response does not clearly indicate modification vs. new screen, ask a follow-up before proceeding:
- "Does this screen already exist in the codebase?"
- "Should I find and edit an existing component file, or build this from scratch?"
- "Is there an existing file path you want me to modify?"

**Never assume. Always confirm.**

---

## 0.1. Pre-Generation Checklist (New Screens Only)

Before writing a single line of code:

1. **Confirm the route path** — Ensure a route path has been agreed (from Section 0 New Screen step 1) before touching any file.
2. **Audit the Figma structure** — Identify all frames, components, variants, and instances.
3. **Detect repetition** — Any element appearing 2+ times is a candidate for abstraction.
4. **Map component hierarchy** — Build a mental tree: pages → sections → blocks → atoms.
5. **Identify state** — Note hover, active, disabled, loading, empty, and error states from variants.
6. **Pick the right pattern** — Match each abstraction to the correct React design pattern (Section 2).
7. **Read auto-layout** — Translate every auto-layout frame to Flexbox or Grid before writing JSX (Section 3).
8. **Identify assets** — Flag all images, icons, and SVGs and plan their import strategy (Section 4).
9. **Read Figma component properties** — Map boolean props, instance-swap slots, and text overrides to React props (Section 5).

---

## 1. Folder & File Structure

```
src/
├── components/
│   ├── ui/                  # Atomic, stateless presentational components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   └── index.ts
│   │   └── ...
│   ├── composed/            # Composed components (2+ atoms working together)
│   ├── hoc/                 # Higher-Order Components
│   ├── providers/           # Context providers
│   └── layouts/             # Page-level layout shells
├── hooks/                   # Custom hooks
├── context/                 # React Contexts
├── types/                   # Shared TypeScript types/interfaces
├── utils/                   # Pure helper functions
├── assets/
│   ├── icons/               # SVG icon components (generated via SVGR)
│   └── images/              # Static images
├── router/
│   └── index.tsx            # All route definitions live here
└── pages/ (or app/)         # Route-level page components
    ├── DashboardPage/
    │   ├── DashboardPage.tsx
    │   └── index.ts
    └── ...
```

**Rules:**
- One component per file.
- Every component folder has an `index.ts` barrel export — named exports only, never default re-exports.
- Co-locate types in a `.types.ts` file if non-trivial.

---

## 1.1 Routing Rules

Every new page component **must** have a corresponding route entry. Delivering a page file without registering its route is an incomplete output.

### Hard Rules

- Every page lives in `src/pages/` (React Router) or `src/app/` (Next.js App Router) — never in `src/components/`.
- Every new page must have exactly one route path. If the user does not specify a path, the agent must infer one from the Figma frame name, state it, and wait for confirmation before writing any code.
- Route paths use lowercase kebab-case slugs: `/user-profile`, `/order-history`, not `/UserProfile` or `/order_history`.
- Dynamic segments use the router's convention: `:id` for React Router, `[id]` for Next.js.
- Protected pages (auth-gated in Figma) must be wrapped in a guard component at the route level — not inside the page itself.

### React Router v6 — Route Registration Pattern

```tsx
// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout }       from '@/components/layouts/RootLayout';
import { DashboardPage }    from '@/pages/DashboardPage';
import { UserProfilePage }  from '@/pages/UserProfilePage';
import { NotFoundPage }     from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,              element: <DashboardPage /> },
      { path: 'profile',          element: <UserProfilePage /> },
      { path: 'profile/:userId',  element: <UserProfilePage /> },
    ],
    errorElement: <NotFoundPage />,
  },
]);
```

```tsx
// src/main.tsx
import { RouterProvider } from 'react-router-dom';
import { router }         from '@/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

### Next.js App Router — Route Registration Pattern

Each page is a `page.tsx` file inside its route folder. The agent must create the folder and file.

```
src/app/
├── page.tsx                        → /
├── dashboard/
│   └── page.tsx                    → /dashboard
├── profile/
│   ├── page.tsx                    → /profile
│   └── [userId]/
│       └── page.tsx                → /profile/:userId
└── not-found.tsx                   → 404
```

```tsx
// src/app/dashboard/page.tsx
import { DashboardPage } from '@/pages/DashboardPage';

export const metadata = { title: 'Dashboard' };

export default function Page() {
  return <DashboardPage />;
}
```

### Route Path Inference Rules

When no route is provided by the user, the agent derives the path using this priority order:

1. **Figma frame name** — strip spaces, lowercase, kebab-case. `"User Profile"` → `/user-profile`.
2. **Page component name** — strip the `Page` suffix, kebab-case. `OrderHistoryPage` → `/order-history`.
3. **Parent frame context** — if the frame is nested under a named section in Figma (e.g. `Settings / Notifications`), use the hierarchy: `/settings/notifications`.

The agent must always state the inferred path explicitly and invite correction before writing code:
> _"No route path was specified. Based on the Figma frame name I'll use `/user-profile`. Confirm or provide a different path."_

---

## 2. Design Pattern Decision Matrix

**Apply this matrix on every component identified from Figma. No exceptions.**

| Figma Signal | React Pattern to Apply |
|---|---|
| A component appears in multiple frames with the same structure | **HOC** or **Custom Hook** |
| A component has multiple visual variants (size, color, state) | **Props-driven component** with a variant map |
| A container whose children vary by context (Card, Modal, Drawer) | **Compound Component Pattern** |
| Logic is reusable but the UI differs across uses | **Custom Hook** |
| A wrapper that injects cross-cutting concerns (auth, analytics, loading) | **Higher-Order Component (HOC)** |
| A list where each item has a dynamic internal structure | **Render Props** or **children as function** |
| Global state shared across disconnected components (theme, user, cart) | **Context + Provider Pattern** |
| A multi-step form, wizard, or flow with explicit step states | **State Machine** (`useReducer` or XState) |
| Slot-based layout (header / body / footer regions in Figma) | **Slot Pattern** via named props |
| A section that fetches and renders data | **Container / Presentational Split** |

---

## 3. Auto-Layout → CSS Translation (CRITICAL)

Auto-layout is the most frequent Figma-to-code translation. Every auto-layout frame must be converted to Flexbox or Grid — never hardcoded pixel positions.

### 3.1 Direction Mapping

| Figma Auto-Layout Direction | CSS Output |
|---|---|
| Horizontal | `display: flex; flex-direction: row` → `flex flex-row` |
| Vertical | `display: flex; flex-direction: column` → `flex flex-col` |
| Wrap (horizontal) | `display: flex; flex-wrap: wrap` → `flex flex-wrap` |
| Grid layout | `display: grid; grid-template-columns: repeat(N, 1fr)` |

### 3.2 Spacing & Padding

| Figma Property | Tailwind / CSS |
|---|---|
| Gap (uniform) | `gap-{n}` |
| Gap (row / column separate) | `gap-x-{n} gap-y-{n}` |
| Padding (uniform) | `p-{n}` |
| Padding (horizontal / vertical) | `px-{n} py-{n}` |
| Padding (per side) | `pt-{n} pr-{n} pb-{n} pl-{n}` |

### 3.3 Alignment Mapping

| Figma Alignment | CSS | Tailwind |
|---|---|---|
| Align items: Start | `align-items: flex-start` | `items-start` |
| Align items: Center | `align-items: center` | `items-center` |
| Align items: End | `align-items: flex-end` | `items-end` |
| Justify content: Start | `justify-content: flex-start` | `justify-start` |
| Justify content: Center | `justify-content: center` | `justify-center` |
| Justify content: End | `justify-content: flex-end` | `justify-end` |
| Justify content: Space Between | `justify-content: space-between` | `justify-between` |

### 3.4 Sizing

| Figma Constraint | CSS / Tailwind |
|---|---|
| Fixed width / height | `w-{n} h-{n}` — use only if the design explicitly fixes the dimension |
| Fill container (horizontal) | `w-full` |
| Fill container (vertical) | `h-full` or `flex-1` |
| Hug contents | no width/height set (natural size) |
| Min / Max constraints | `min-w-{n} max-w-{n}` |

> **Rule:** Never hardcode a pixel value from Figma directly in JSX. Convert it to the nearest Tailwind scale value or a CSS variable design token.

### 3.5 Example Translation

```
Figma frame:
  Direction: Horizontal
  Gap: 16px
  Padding: 24px (all sides)
  Align items: Center
  Justify: Space Between
  Width: Fill container
```

```tsx
// ✅ Correct output
<div className="flex flex-row items-center justify-between gap-4 p-6 w-full">
  {children}
</div>
```

---

## 4. Asset Handling

### 4.1 Icons

- Export all icons from Figma as SVG.
- Convert to React components using **SVGR** — never inline raw SVG strings in JSX.
- Place generated icon components in `src/assets/icons/`.
- Every icon component must accept `size`, `color`, `aria-label`, and `className` props.

```tsx
// src/assets/icons/ChevronDown.tsx
interface IconProps {
  size?:      number;
  color?:     string;
  className?: string;
  'aria-label'?: string;
}

export function ChevronDownIcon({ size = 24, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={!props['aria-label']}
      {...props}
    >
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
```

### 4.2 Images

- Use `<img>` with `alt` text for standard images.
- For Next.js projects: use `next/image` with explicit `width` and `height`.
- Never embed base64 image data in component files.
- Place image assets in `src/assets/images/` and import them statically.

---

## 5. Figma Component Properties → React Props

Figma's component properties have direct React equivalents. Map them correctly.

| Figma Property Type | React Equivalent |
|---|---|
| **Boolean property** (e.g. `showIcon: boolean`) | Optional boolean prop — `hasIcon?: boolean` |
| **Text property** (e.g. `label: string`) | String prop — `label: string` |
| **Instance swap property** (e.g. `icon: component`) | `ReactNode` prop — `icon?: React.ReactNode` |
| **Variant property** (e.g. `size: SM/MD/LG`) | Union type prop — `size?: 'sm' \| 'md' \| 'lg'` |

```tsx
// Figma component: Button
// Properties: label (text), size (SM/MD/LG), isDisabled (boolean), leftIcon (instance swap)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label:       string;
  size?:       'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  leftIcon?:   React.ReactNode;
}
```

---

## 6. Responsive Design Rules

Figma designs are typically provided at a single breakpoint (usually desktop 1440px or mobile 375px). The agent must apply responsive behaviour unless told otherwise.

### 6.1 Breakpoint Strategy (Tailwind defaults)

| Breakpoint | Prefix | Min Width |
|---|---|---|
| Mobile (default) | _(none)_ | 0px |
| Tablet | `md:` | 768px |
| Desktop | `lg:` | 1024px |
| Wide | `xl:` | 1280px |

### 6.2 Rules

- **Mobile-first by default.** Write base styles for mobile, then add `md:` and `lg:` overrides.
- If Figma only provides desktop frames, infer reasonable mobile stacking behaviour (column layout, full-width elements, reduced padding).
- If Figma provides both mobile and desktop frames, implement both — do not interpolate.
- Never use fixed pixel widths for layout containers — use `max-w-*` with `mx-auto` for centred page layouts.

```tsx
// ✅ Correct — mobile first, responsive
<div className="flex flex-col gap-4 p-4 md:flex-row md:gap-6 md:p-6 lg:p-8">
```

---

## 7. Pattern Implementations

### 7.1 Higher-Order Component (HOC)

```tsx
// hoc/withLoadingState.tsx
import React, { ComponentType } from 'react';
import { Spinner } from '@/components/ui/Spinner';

interface WithLoadingProps { isLoading?: boolean; }

export function withLoadingState<T extends object>(WrappedComponent: ComponentType<T>) {
  const DisplayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithLoading = ({ isLoading, ...props }: T & WithLoadingProps) => {
    if (isLoading) return <Spinner />;
    return <WrappedComponent {...(props as T)} />;
  };

  ComponentWithLoading.displayName = `WithLoadingState(${DisplayName})`;
  return ComponentWithLoading;
}
```

### 7.2 Compound Component Pattern

```tsx
// components/composed/Card/Card.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface CardContextValue { variant?: 'default' | 'elevated' | 'outlined'; }
const CardContext = createContext<CardContextValue>({});

interface CardProps extends CardContextValue { children: ReactNode; className?: string; }

function Card({ children, variant = 'default', className }: CardProps) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div className={`card card--${variant} ${className ?? ''}`}>{children}</div>
    </CardContext.Provider>
  );
}

function CardHeader({ children }: { children: ReactNode }) {
  return <div className="card__header">{children}</div>;
}
function CardBody({ children }: { children: ReactNode }) {
  return <div className="card__body">{children}</div>;
}
function CardFooter({ children }: { children: ReactNode }) {
  return <div className="card__footer">{children}</div>;
}

Card.Header = CardHeader;
Card.Body   = CardBody;
Card.Footer = CardFooter;

export { Card };
```

### 7.3 Custom Hook Pattern

```tsx
// hooks/useDisclosure.ts
import { useState, useCallback } from 'react';

export function useDisclosure(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const open   = useCallback(() => setIsOpen(true), []);
  const close  = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  return { isOpen, open, close, toggle };
}
```

### 7.4 Container / Presentational Split

```tsx
// Presentational
export function ProductGrid({ products, onSelect }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map(p => (
        <ProductCard key={p.id} {...p} onClick={() => onSelect(p.id)} />
      ))}
    </div>
  );
}

// Container
export function ProductGridContainer() {
  const { data: products, isLoading } = useProducts();
  const navigate = useNavigate();
  if (isLoading) return <Spinner />;
  return <ProductGrid products={products} onSelect={id => navigate(`/product/${id}`)} />;
}
```

### 7.5 Render Props Pattern

```tsx
interface ListProps<T> {
  items:        T[];
  renderItem:   (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  emptyState?:  React.ReactNode;
}

export function List<T>({ items, renderItem, keyExtractor, emptyState }: ListProps<T>) {
  if (items.length === 0) return <>{emptyState ?? <p>No items.</p>}</>;
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}
```

### 7.6 Context + Provider Pattern

```tsx
type Theme = 'light' | 'dark';
interface ThemeContextValue { theme: Theme; toggleTheme: () => void; }
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

### 7.7 Slot Pattern

```tsx
interface DashboardLayoutProps {
  sidebar:  React.ReactNode;
  toolbar:  React.ReactNode;
  children: React.ReactNode;
  footer?:  React.ReactNode;
}

export function DashboardLayout({ sidebar, toolbar, children, footer }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-layout__sidebar">{sidebar}</aside>
      <div className="dashboard-layout__main">
        <header className="dashboard-layout__toolbar">{toolbar}</header>
        <main className="dashboard-layout__content">{children}</main>
        {footer && <footer className="dashboard-layout__footer">{footer}</footer>}
      </div>
    </div>
  );
}
```

---

## 8. Component Props Standards

```tsx
// ✅ DO — Explicit, typed, extensible, with JSDoc
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button */
  variant?:   'primary' | 'secondary' | 'ghost' | 'danger';
  /** Size scale */
  size?:      'sm' | 'md' | 'lg';
  /** Shows a spinner and disables interaction */
  isLoading?: boolean;
  /** Icon rendered before the label */
  leftIcon?:  React.ReactNode;
  /** Icon rendered after the label */
  rightIcon?: React.ReactNode;
}

// ❌ DON'T — Loose, untyped, fragile
interface ButtonProps {
  style?:    any;
  onClick?:  any;
  children?: any;
}
```

**Rules:**
- Always extend the native HTML element's props using `React.HTMLAttributes<T>`.
- Use `variant` and `size` as standardised discriminators — never `type` for visual intent.
- Boolean props must use the `is` / `has` / `can` prefix: `isDisabled`, `hasError`, `canExpand`.
- Never pass raw style objects as props — use `className`.
- All non-obvious props must have a JSDoc comment.

---

## 9. Figma Variant → React Variant Mapping

Use a `variantMap` — never inline ternaries.

```tsx
// ✅ DO — Scalable variant map
const buttonVariants: Record<ButtonVariant, string> = {
  primary:   'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'bg-white text-brand-600 border border-brand-600 hover:bg-brand-50',
  ghost:     'bg-transparent text-brand-600 hover:bg-brand-50',
  danger:    'bg-red-600 text-white hover:bg-red-700',
};

// ❌ DON'T — Ternary hell
className={variant === 'primary' ? 'bg-brand-600' : variant === 'secondary' ? 'bg-white' : '...'}
```

---

## 10. State Handling Rules

| State Type | Implementation |
|---|---|
| Local UI state (toggle, input) | `useState` |
| Derived state | Compute inline — never store in state |
| Multi-field form | `useReducer` or React Hook Form |
| Async / server state | TanStack Query or `useEffect` + `useState` |
| Global app state (low update frequency) | `Context` + `Provider` |
| Global app state (high update frequency) | Zustand or Redux Toolkit |
| Complex flows with explicit steps | `useReducer` with typed action objects |

---

## 11. Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Component | PascalCase | `UserProfileCard` |
| Hook | camelCase with `use` prefix | `useUserProfile` |
| HOC | camelCase with `with` prefix | `withAuthGuard` |
| Context | PascalCase + `Context` suffix | `AuthContext` |
| Provider | PascalCase + `Provider` suffix | `AuthProvider` |
| Event handler prop | `on` + PascalCase verb | `onSubmit`, `onSelectItem` |
| Boolean prop | `is` / `has` / `can` + adjective | `isOpen`, `hasError` |
| CSS class (BEM) | `block__element--modifier` | `card__header--highlighted` |
| Icon component | PascalCase + `Icon` suffix | `ChevronDownIcon` |

---

## 12. Accessibility (a11y) — Non-Negotiable

Every component generated from Figma must meet **WCAG 2.1 AA** minimum:

- All interactive elements must have a discernible accessible name (`aria-label`, `aria-labelledby`, or visible text).
- Buttons must use `<button>`, links must use `<a href>`. Never `<div onClick>`.
- All images must have `alt` text. Decorative images use `alt=""`.
- Form inputs must be paired with a `<label>` (via `htmlFor` or wrapping).
- Focus states must be visible — never `outline: none` without a visible replacement.
- Use semantic HTML: `<nav>`, `<main>`, `<aside>`, `<section>`, `<article>`, `<header>`, `<footer>`.
- Modals and Drawers must trap focus and support `Escape` to close.
- Colour contrast ratio: minimum 4.5:1 for normal text, 3:1 for large text.
- Decorative SVG icons: `aria-hidden="true"`. Meaningful icons: `aria-label` on the button wrapping them.

---

## 13. Performance Patterns

| Scenario | Pattern |
|---|---|
| Expensive computation inside render | `useMemo` |
| Callback passed to a child component | `useCallback` |
| Large list (50+ items) | Virtual scrolling (`@tanstack/react-virtual`) |
| Component only needed on interaction | `React.lazy` + `Suspense` |
| Prop drilling beyond 2 levels | `Context` or component composition |
| Prevent unnecessary re-renders on leaf | `React.memo` — only after profiling |

> ⚠️ Do NOT add `useMemo`, `useCallback`, or `React.memo` preemptively. Profile first.

---

## 14. Code Quality Checklist

Run this before finalising any generated output:

- [ ] Screen context confirmed (new vs. modification) before any code was written.
- [ ] Route path confirmed or inferred and stated before any code was written (new screens only).
- [ ] Route entry added to `src/router/index.tsx` or the correct `app/` folder (new screens only).
- [ ] Codebase searched for existing matching components before building new ones.
- [ ] Every auto-layout frame translated to Flexbox or Grid (no absolute positioning unless Figma layer is explicitly positioned).
- [ ] No hardcoded pixel values — all spacing and sizing uses Tailwind scale or CSS variables.
- [ ] No magic strings — all variants, sizes, and states use TypeScript union types or enums.
- [ ] No inline styles — all styling via `className`.
- [ ] No `any` types — every prop and return value is explicitly typed.
- [ ] All non-obvious props have JSDoc comments.
- [ ] Every repeated UI block is extracted into a named component.
- [ ] Every repeated logic block is extracted into a custom hook.
- [ ] Every component appearing in 2+ contexts is evaluated for HOC or compound pattern.
- [ ] All async states (loading, error, empty) are handled and rendered.
- [ ] All components meet accessibility requirements.
- [ ] Barrel `index.ts` exports exist for every component folder — named exports only.
- [ ] No business logic lives inside a presentational component.
- [ ] Responsive behaviour applied (mobile-first, `md:` and `lg:` overrides).
- [ ] All SVG icons are SVGR components, not inline SVG strings.

---

## 15. Anti-Patterns — Never Generate These

| ❌ Anti-Pattern | ✅ Correct Approach |
|---|---|
| God component (>200 lines, mixed concerns) | Split into container + presentational + hooks |
| Prop drilling beyond 2 levels | Context or component composition |
| `useEffect` to compute derived state | Compute inline during render |
| `useEffect` to handle events | Use event handlers directly |
| Direct DOM manipulation | Refs only when strictly unavoidable |
| Storing derived data in state | Derive from source state |
| Hardcoded pixel values copied from Figma | Map to Tailwind scale or CSS variable |
| Copy-pasted JSX blocks | Extract into a named component immediately |
| All components in a single `index.tsx` | One component per file |
| Creating a new component file for an existing screen | Edit the existing component directly |
| Absolute positioning for auto-layout frames | Flexbox or Grid |
| Inline SVG strings in JSX | SVGR icon components |
| Default re-exports in barrel files | Named exports only |
| Delivering a new page without a route entry | Always register the route in the same output |
| Page components placed in `src/components/` | Pages live in `src/pages/` or `src/app/` only |
| Route paths with uppercase or underscores | Lowercase kebab-case slugs only |
| Auth-gating logic inside the page component | Wrap at the route level with a guard component |

---

## 16. Design Token Mapping

Figma tokens must map to CSS variables or Tailwind config — never hardcoded.

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  'var(--color-brand-50)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
        },
      },
      spacing:      { section: 'var(--spacing-section)' },
      borderRadius: { card:    'var(--radius-card)' },
      boxShadow:    { card:    'var(--shadow-card)' },
    },
  },
};
```

| Figma Property | CSS Variable Prefix |
|---|---|
| Fill / colour | `--color-*` |
| Text style | `--font-size-*`, `--font-weight-*`, `--line-height-*` |
| Spacing / padding / gap | `--spacing-*` |
| Corner radius | `--radius-*` |
| Drop shadow / elevation | `--shadow-*` |
| Opacity | `--opacity-*` |

---

## 17. Prompting This File From Any Agent

```
Read docs/FIGMA_TO_REACT_AGENT_GUIDELINES.md in full.
Then implement the selected/described Figma layer as React components,
following every rule and pattern in that file.
```

For file-reference agents:
```
@docs/FIGMA_TO_REACT_AGENT_GUIDELINES.md
Implement the selected Figma layer as React components.
```

> **Reminder:** Section 0 (Screen Context Check) is always the first step. No code is written until the agent confirms new vs. modification.

---

*Last updated: May 2026*