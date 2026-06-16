# Claude Code Agent Instructions — UI Orchestrator

## On Every Session

Read and internalize **`docs/FIGMA_TO_REACT_AGENT_GUIDELINES.md`** before writing any code.
All React code in this project must follow those guidelines strictly — no exceptions.

---

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS (utility classes only — no inline styles, no hardcoded pixel values)
- TanStack Query for server state
- React Hook Form for forms
- Zustand for global client state (only if Context + Provider is insufficient)
- SVGR for SVG icon components

---

## Project Conventions

- Components live in `src/components/` — one component per file
- Hooks live in `src/hooks/`
- Icons live in `src/assets/icons/` as SVGR components
- Every component folder must have an `index.ts` barrel export (named exports only)
- Use path alias `@/` mapped to `src/`

---

## Figma MCP Workflow

When a Figma layer is selected and you are asked to implement it:

1. **Ask first** — "Is this a modification to an existing screen or a new screen?" — wait for the answer before doing anything else.
2. **If modification** — locate the existing component file and edit it directly. Do not create a new file.
3. **If new screen** — confirm or infer the route path before writing any code. State the inferred path explicitly: _"I'll register this at `/inferred-path` — confirm or provide a different path."_ Then search `src/components/` for any reusable atoms or composed components that already exist before building new.
4. Use `get_design_context` to read the selected Figma node.
5. Translate every auto-layout frame to Flexbox or Grid (Section 3 of guidelines). Never use absolute positioning for auto-layout frames.
6. Map Figma component properties to React props using the property-type table (Section 5 of guidelines).
7. Identify the right pattern from the decision matrix (Section 2 of guidelines).
8. Generate the component tree — atoms first, then composed, then the page component in `src/pages/`.
9. **Register the route** — add the new page to `src/router/index.tsx` (React Router) or create the correct `app/` folder and `page.tsx` file (Next.js). This is part of the output, not optional (Section 1.1 of guidelines).
10. Map all Figma tokens (colors, spacing, radius, shadow) to Tailwind classes or CSS variables. Never hardcode pixel values from Figma.
11. Export all SVGs as SVGR icon components — never inline SVG strings in JSX.
12. Apply mobile-first responsive styles using Tailwind breakpoint prefixes (`md:`, `lg:`).
13. Run the full Code Quality Checklist (Section 14 of guidelines) before finalising output.

---

## Git Workflow — UI Orchestrator Branching (MANDATORY)

This rule applies **every time** a new module, screen, or component set is built or modified from a Figma layer. It is not optional.

### On Every Module Build

After all files for a module are written and verified against the Code Quality Checklist, the agent must execute the following Git steps **automatically**, without waiting to be asked:

```bash
# 1. Ensure you are on main/master and it is clean before branching
git checkout main        # or master — use whatever the default branch is
git pull origin main

# 2. Create a new branch named after the module/screen
#    Branch name format: ui-orchestrator/<kebab-case-module-name>
#    Derive the name from the Figma frame name or the inferred route slug
git checkout -b ui-orchestrator/<module-name>

# 3. Stage all files created or modified for this module
git add .

# 4. Commit with the mandatory tag format
git commit -m "feat(<module-name>): <one-line description of what was built>

[created by UI orchestrator]"

# 5. Push the branch to origin
git push origin ui-orchestrator/<module-name>
```

### Branch Naming Rules

| Source | Branch Name |
|---|---|
| Figma frame: `"User Profile"` | `ui-orchestrator/user-profile` |
| Figma frame: `"Order History"` | `ui-orchestrator/order-history` |
| Inferred route `/settings/notifications` | `ui-orchestrator/settings-notifications` |
| Atoms/shared components only | `ui-orchestrator/shared-ui-atoms` |

### Commit Message Rules

- Format: `feat(<module-name>): <short description>`
- The body **must always** include the line `[created by UI orchestrator]` — this is the tag that identifies agent-generated commits across the repository history.
- One commit per module build. Do not split the module across multiple commits unless explicitly instructed.
- If modifying an existing screen: use `fix` or `refactor` prefix instead of `feat`.

### Example Commit Messages

```
feat(user-profile): implement UserProfile page from Figma

- UserProfileCard, AvatarUpload, ProfileForm atoms
- UserProfileContainer with TanStack Query integration
- Route registered at /profile/:userId
- Mobile-first responsive, WCAG 2.1 AA compliant

[created by UI orchestrator]
```

```
refactor(dashboard): update DashboardLayout sidebar slot from Figma changes

[created by UI orchestrator]
```

### If Git Is Not Initialised

If the project does not yet have a git repository, initialise it first:

```bash
git init
git add .
git commit -m "chore: initial project scaffold

[created by UI orchestrator]"
```

Then proceed with the module branch as described above.

### Failure Is Not an Option

If any `git` command fails, report the exact error and do not proceed to the next step silently. The agent must surface the error and ask for guidance before continuing.

---

## Summary of Mandatory Per-Module Sequence

1. Read `docs/FIGMA_TO_REACT_AGENT_GUIDELINES.md`
2. Ask: new screen or modification?
3. Confirm/infer route path (new screens only)
4. Read Figma node via `get_design_context`
5. Build component tree (atoms → composed → page)
6. Register route
7. Run Code Quality Checklist (Section 14 of guidelines)
8. **Checkout new branch** → **commit with `[created by UI orchestrator]` tag** → **push**
