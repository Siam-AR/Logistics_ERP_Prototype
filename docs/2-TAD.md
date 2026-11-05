# Logistics ERP Prototype — Technical Architecture Document (TAD)

**Version:** 0.1 · **Team:** 3 developers · **Time box:** 6 hours · **Related:** Logistics ERP Prototype PRD v0.1

## 1. Principles

- As simple as possible. If something is not needed to demo the 3 features, it is not built.
- One app, one repo, one database. No separate backend, no microservices.
- Only these technologies: **Next.js, TypeScript, Tailwind CSS, MongoDB.** No other libraries beyond what these four require.
- No authentication, roles, or deployment pipeline (out of scope per PRD).

## 2. Tech Stack

| Layer     | Choice               | Notes                                                                               |
| --------- | -------------------- | ----------------------------------------------------------------------------------- |
| Framework | Next.js (App Router) | Pages, API, and server logic in one project                                         |
| Language  | TypeScript           | Shared types for all three modules                                                  |
| Styling   | Tailwind CSS         | Utility classes only, no component library                                          |
| Database  | MongoDB              | Official `mongodb` driver (the Node driver Next.js uses to talk to MongoDB); no ODM |

## 3. Architecture

```
Browser
  │
  ▼
Next.js app
  ├─ Pages (server components)  → read data from MongoDB, render tables and cards
  ├─ Client forms               → add / edit entries
  └─ Route Handlers (/api/*)    → create, update, delete
  │
  ▼
MongoDB (3 collections)
```

- **Reading:** Pages are server components that query MongoDB directly and render HTML. No client-side data fetching library.
- **Writing:** Forms send `fetch` requests to simple Route Handlers, then the page refreshes (`router.refresh()`).
- **Dashboard:** Computes totals from the same 3 collections on the server. It has no data of its own.

## 4. Project Structure

```
/app
  layout.tsx            ← shared layout with tab navigation
  page.tsx              ← Dashboard
  finance/page.tsx      ← COD, Debit & Credit tab
  fleet/page.tsx        ← Fleet tab
  inventory/page.tsx    ← Inventory tab
  api/
    finance/route.ts    ← POST (create)
    finance/[id]/route.ts ← PUT, DELETE
    fleet/route.ts
    fleet/[id]/route.ts
    inventory/route.ts
    inventory/[id]/route.ts
/components
  Nav.tsx               ← 4 tabs
  Card.tsx              ← dashboard summary card
  Table.tsx             ← simple reusable table
  Modal.tsx             ← simple add/edit form container
/lib
  db.ts                 ← MongoDB connection (single cached client)
  types.ts              ← FinanceEntry, Vehicle, InventoryItem
  seed.ts               ← sample data script
```

Each module follows the same pattern, so once one is built the other two are copy-and-adapt.

## 5. Data Model (MongoDB)

Three collections. No relations between them.

**finance**

| Field       | Type                               |
| ----------- | ---------------------------------- |
| `_id`       | ObjectId                           |
| `date`      | string (ISO date)                  |
| `party`     | string                             |
| `type`      | `"COD"` \| `"Debit"` \| `"Credit"` |
| `amount`    | number                             |
| `reference` | string (optional)                  |
| `status`    | `"Pending"` \| `"Settled"`         |

**vehicles**

| Field         | Type                                               |
| ------------- | -------------------------------------------------- |
| `_id`         | ObjectId                                           |
| `plate`       | string                                             |
| `vehicleType` | string                                             |
| `driver`      | string                                             |
| `status`      | `"Available"` \| `"On Trip"` \| `"In Maintenance"` |
| `notes`       | string (optional)                                  |

**inventory**

| Field           | Type     |
| --------------- | -------- |
| `_id`           | ObjectId |
| `name`          | string   |
| `sku`           | string   |
| `quantity`      | number   |
| `unit`          | string   |
| `lowStockLevel` | number   |

## 6. API (Route Handlers)

The same 3 endpoints for each module. Reading is done by the pages, so there is no GET API.

| Method | Path                 | Action          |
| ------ | -------------------- | --------------- |
| POST   | `/api/{module}`      | Create a record |
| PUT    | `/api/{module}/[id]` | Update a record |
| DELETE | `/api/{module}/[id]` | Delete a record |

`{module}` is `finance`, `fleet`, or `inventory`. Validation is basic: required fields present, numbers are numbers, status is one of the allowed values.

## 7. Dashboard Calculations

| Card                         | Query                                                  |
| ---------------------------- | ------------------------------------------------------ |
| COD pending                  | Sum `amount` where `type = COD` and `status = Pending` |
| Total debit / credit         | Sum `amount` by `type`                                 |
| Vehicles per status          | Count grouped by `status`                              |
| Total items / total quantity | Count and sum `quantity`                               |
| Low-stock items              | Count where `quantity <= lowStockLevel`                |

All done with simple MongoDB `find` / `aggregate` calls in the page.

## 8. Environment

- Node.js (current LTS) and a MongoDB database (local or a free hosted cluster).
- One environment variable: `MONGODB_URI`.
- Run locally with `npm run dev`. Seed sample data with one script.
- Deployment is not part of the 6-hour scope.

## 9. Work Split (3 Developers, 6 Hours)

Each developer owns one module end to end (page, form, API, types) to avoid merge conflicts.

| Developer | Owns                         | Also                                          |
| --------- | ---------------------------- | --------------------------------------------- |
| Dev 1     | Finance (COD, Debit, Credit) | Project setup, `lib/db.ts`, layout and Nav    |
| Dev 2     | Fleet                        | Shared `Table` and `Modal` components         |
| Dev 3     | Inventory                    | Dashboard page, `Card` component, seed script |

### Timeline

| Time        | Goal                                                                                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0:00 – 0:45 | Dev 1 creates the project, DB connection, layout, and Nav, then pushes. Dev 2 and Dev 3 clone and agree on `types.ts` and the shared components while waiting. |
| 0:45 – 3:45 | Each developer builds their own module: table page, add / edit form, delete, filters.                                                                          |
| 3:45 – 4:45 | Dev 3 builds the Dashboard from all three collections. Dev 1 and Dev 2 finish and polish their modules.                                                        |
| 4:45 – 5:30 | Seed sample data, join all branches, fix integration issues.                                                                                                   |
| 5:30 – 6:00 | Full walkthrough against the PRD checklist, small fixes, final push.                                                                                           |

## 10. Git Rules

- One `main` branch plus one branch per developer: `feat/finance`, `feat/fleet`, `feat/inventory`.
- Each developer touches only their own folders, except the agreed shared files.
- Merge to `main` at 0:45, 3:45, and 5:30.

## 11. Definition of Done

- All four tabs open and work.
- Add, edit, and delete work in the three modules.
- Dashboard numbers match the tab data.
- Sample data is preloaded.
- App runs locally with `npm install` and `npm run dev`.

## 12. Risks and Shortcuts

- **Merge conflicts:** avoided by module ownership and a short setup phase.
- **Running out of time:** cut filters first, then edit (keep add and delete), then styling polish. Never cut the Dashboard.
- **Database setup delay:** use a free hosted MongoDB cluster so no one installs anything locally.

## 13. Performance Optimization Manual (for AI Agent)

**Status:** The prototype works correctly. This section is added after the build. Its goal is to make the app **fast and smooth without changing what it does.**

**Observed problems**

- The UI feels laggy overall.
- Modals open slowly.
- Scrolling is janky and stutters.

> **Instruction to the AI Agent:** Read this whole section before touching any code. Execute the phases in order (13.4 → 13.12). Do not skip the safety rules (13.2) or the verification steps. A correct but slightly slower app is better than a fast but broken one.

### 13.1 Scope and Principle Override

- Section 1 says "only Next.js, TypeScript, Tailwind CSS, MongoDB". **For this optimization work only, the libraries in 13.3 are also allowed.** Nothing else may be added without written justification (see 13.3).
- The optimization must **not** change: features, UI text, layout, colors, routes, API paths, request/response shapes, database collections, field names, or the Dashboard calculations in Section 7.
- Everything in the Definition of Done (Section 11) must still be true when finished.

### 13.2 Safety Rules (Never Break the Project)

1. **Branch and tag first.** Run `git status` (must be clean), then `git tag pre-optimize` and `git checkout -b chore/optimize`. Never work on `main`.
2. **Green baseline first.** Before any change, run `npm run build`. It must pass. If lint or type-check scripts exist, run them as well. If the baseline already fails, stop and report. Do not "fix" unrelated things.
3. **One change at a time.** Make one logical optimization, then run `npm run build`, then manually verify the affected screen (13.11), then commit with a clear message (`perf: lazy-mount modal content`). Never batch several optimizations into one commit.
4. **Revert on regression.** If a change breaks behavior, causes a type or build error, or does not measurably help, run `git revert` or `git checkout -- .` immediately. Do not stack fixes on top of a broken change.
5. **No major upgrades.** Do not upgrade Next.js, React, TypeScript, Tailwind, or the `mongodb` driver to a new major version. Do not change `tsconfig`, `next.config`, or Tailwind config except where a step below says so.
6. **No deletions without proof.** Delete a file, component, or dependency only if a project-wide search proves it is unused.
7. **No stale data.** Never add caching that can show old numbers. The Dashboard must always match the tab data (Definition of Done). If you cache anything, every POST, PUT, and DELETE handler must invalidate it (13.9).
8. **Do not change the visible design.** If an effect (blur, shadow, animation) must be removed for speed, replace it with the cheapest visual equivalent (for example, a solid `bg-black/50` instead of `backdrop-blur`) and list the change in the final report.
9. **Dev mode is not production.** `npm run dev` is much slower than a real build. **Always measure with `npm run build && npm run start`.** Part of the perceived lag may exist only in dev mode. Report that honestly.
10. **When unsure, stop and ask.** If a step needs a decision that is not covered here, write the question in the report instead of guessing.

### 13.3 Allowed Libraries (Whitelist)

| Library                   | Purpose                      | When to use                                                                                              |
| ------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| `lenis`                   | Smooth scrolling             | **Required** by 13.10. Install the current stable `lenis` package (not the old `@studio-freight/lenis`). |
| `@next/bundle-analyzer`   | See what is in the JS bundle | Dev dependency only. Used in 13.4 and 13.12.                                                             |
| `@tanstack/react-virtual` | Virtualize very long lists   | **Only** if a table still has more than ~200 rows after pagination (13.7).                               |

Rules for any other library:

- Prefer a 10-line hook you write yourself (for example `useDebouncedValue`) over a new dependency.
- Before adding anything not listed, write in the report: the measured problem, why the whitelist is not enough, and the package size. If you cannot show a measured benefit, do not add it.

### 13.4 Phase 0: Baseline Measurement

Record these numbers **before** changing anything. Save them in `OPTIMIZATION_REPORT.md` (see 13.13).

1. Run `npm run build && npm run start`. Copy the route table that `next build` prints (First Load JS per route).
2. Add `@next/bundle-analyzer` as a dev dependency and enable it only through an environment flag (`ANALYZE=true`) in `next.config`. Do not leave it always on. Run `ANALYZE=true npm run build` and note the 3 largest chunks.
3. If a browser is available: open Chrome DevTools in the production build.
   - **Performance tab:** record opening a modal, then record scrolling the longest table. Note long tasks (over 50 ms) and dropped frames.
   - **Lighthouse:** run on `/`, `/finance`, `/fleet`, `/inventory`. Note Performance score, LCP, TBT, CLS.
   - **React DevTools Profiler:** record opening a modal and typing in one form field. Note which components re-render.
4. If no browser is available, say so in the report and rely on build output, bundle analysis, and the code checklists below.
5. Count the rows currently in each collection (`finance`, `vehicles`, `inventory`). Row count decides whether pagination is needed (13.7).

### 13.5 Phase 1: CSS and Tailwind Fixes (Biggest Scroll Win, Lowest Risk)

Search the whole project (`/app`, `/components`) for the patterns below. Fix each one.

| Pattern found                                                                   | Problem                                                           | Fix                                                                                 |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `backdrop-blur-*` on modal overlays, sticky headers, or Nav                     | Re-computed every frame while scrolling or animating; very costly | Replace with a solid or semi-transparent background (`bg-black/50`, `bg-white/95`). |
| `transition-all`                                                                | Animates layout properties and forces extra work                  | Replace with `transition-colors`, `transition-opacity`, or `transition-transform`.  |
| Animations on `width`, `height`, `top`, `left`, `margin`                        | Triggers layout every frame                                       | Animate only `opacity` and `transform` (`scale`, `translate`).                      |
| Large `shadow-2xl`, `drop-shadow`, `blur-*`, `filter` on many repeated elements | Expensive paint for every row or card                             | Use a light shadow (`shadow-sm`) or a border. Remove shadows from table rows.       |
| `hover:` effects with transitions on every table row                            | Many elements animating at once                                   | Keep a simple `hover:bg-*` with `transition-colors`, or no transition.              |
| `position: fixed` or `sticky` elements with gradients or blur                   | Repaint on scroll                                                 | Use plain solid colors.                                                             |
| `scroll-behavior: smooth` in CSS (globals or Tailwind `scroll-smooth`)          | Conflicts with Lenis in 13.10                                     | Remove it. Lenis will handle smooth scrolling.                                      |
| `will-change` sprinkled everywhere                                              | Wastes GPU memory when overused                                   | Remove unless on the one element that is animating right now (the modal panel).     |

Verify: the app looks the same (except the removed blur or shadow), builds, and scrolling is no worse.

### 13.6 Phase 2: Modal Speed

Slow modals are almost always caused by one of these. Check each in `components/Modal.tsx` and in the three module pages.

1. **Content mounted even when closed.** If the form and its fields are rendered while the modal is hidden (`hidden`, `opacity-0`, or `translate`), every page re-render also re-renders the hidden form.
   - Fix: when `open` is `false`, `return null`. Mount the form only when open.
2. **Form state lives in the page-level component.** Every keystroke re-renders the whole table.
   - Fix: move `useState` for form fields **into the form component itself** (inside the modal). Pass only `onSubmit`, `onClose`, and the initial values (for edit) from the page.
3. **The whole table re-renders when the modal opens or closes.**
   - Fix: keep the `isOpen` and `editingItem` state in a small client wrapper that sits **beside** the table, not above it. Wrap the table row component in `React.memo`. Pass stable props only.
4. **Modal code is in the initial bundle.**
   - Fix: load the modal with `next/dynamic` (`{ ssr: false }`). Preload it on button hover or focus (call the dynamic import once) so the first open feels instant.
5. **Slow open animation.**
   - Fix: open and close animation must use only `opacity` and `transform`, with a duration of 150–200 ms. Remove `backdrop-blur` (13.5).
6. **Slow save feedback.** `fetch` then `router.refresh()` blocks the UI until the server finishes.
   - Fix: wrap the refresh in `useTransition` so the modal can close immediately and the button shows a pending state. Do not make the UI "optimistic" with fake data. Show the real data after refresh.
7. **Heavy work on open.** Remove any `autoFocus` that causes layout jumps, large inline computations, or `JSON.parse(JSON.stringify(...))` copies of big lists inside the modal.
8. **Body scroll lock.** Use a simple approach: toggle a class on `document.body` in a `useEffect`, and clean it up on unmount. Do not use a library. (Lenis integration in 13.10 adds `lenis.stop()` as well.)

Verify: open and close each of the 3 modals 10 times in a row. Add, edit, and delete one record each. Check Escape key and overlay click still close the modal and that focus does not get lost.

### 13.7 Phase 3: Tables and Scrolling

1. **Check row count** from the baseline.
   - Under ~100 rows per table: skip pagination. Only do memoization below.
   - Over ~100 rows: add **server-side pagination** (page size 25 or 50) using a `?page=` search param, `skip` and `limit` in the MongoDB query, and simple Previous / Next controls styled like the existing UI.
   - **Critical:** the Dashboard must keep calculating from the **full** collections (aggregate queries), never from a paginated page.
2. **Memoize rows.** Extract the table row into its own component and wrap it with `React.memo`. Do not create new objects or inline arrow functions per row in props where avoidable (use `useCallback` for handlers passed to rows).
3. **Stable keys.** Use `_id` (as a string) as `key`. Never use array index.
4. **`content-visibility`.** For long tables, add a utility class in `globals.css`:
   ```css
   .row-lazy {
     content-visibility: auto;
     contain-intrinsic-size: auto 48px; /* match the real row height */
   }
   ```
   Apply it to rows only if the row height is fixed and it does not break sticky headers or layout. If it causes visual glitches, remove it.
5. **Virtualization** (`@tanstack/react-virtual`) only if a table is still over ~200 rows after pagination and is still janky. Otherwise do not add it.
6. **Filters and search inputs.** Debounce text filters by ~250 ms using a small `useDebouncedValue` hook written in `/lib` (no library). Do not trigger a server refresh on every keystroke.
7. **Wide tables.** Wrap in `overflow-x-auto`. Add `data-lenis-prevent` to that wrapper later (13.10) so Lenis does not fight horizontal scrolling.
8. **Scroll listeners.** Search for `addEventListener('scroll'` and `onScroll`. Remove unnecessary ones. Any that remain must use `{ passive: true }` and avoid setting React state on every event.

### 13.8 Phase 4: MongoDB and Data Layer

1. **Single cached client.** Open `lib/db.ts`. In development the client must be stored on `globalThis` so hot reloads do not create a new connection each time. In production a module-level singleton is fine. If it creates a new `MongoClient` per request, fix it.
2. **Indexes.** Create `lib/indexes.ts` (or add to the seed script) that creates these indexes once. Run it manually once. Do not run it on every request.

   | Collection  | Index                                       |
   | ----------- | ------------------------------------------- |
   | `finance`   | `{ type: 1, status: 1 }` and `{ date: -1 }` |
   | `vehicles`  | `{ status: 1 }`                             |
   | `inventory` | `{ name: 1 }`                               |

   Do **not** create unique indexes (existing data may contain duplicates and the app does not currently enforce uniqueness).
3. **Parallel queries.** The Dashboard fetches several independent results. Run them with `Promise.all`, not one `await` after another.
4. **Aggregate on the database.** Dashboard sums and counts must use `aggregate` with `$group` or `countDocuments`, not "fetch everything and `.reduce` in JavaScript". The low-stock count (`quantity <= lowStockLevel`) compares two fields, so use `$expr`. That query cannot use an index, which is fine at this size.
5. **Projection and sorting.** Fetch only the fields the page shows. Always sort on the database (`.sort({ date: -1 })`), not in JS.
6. **Serialization.** Convert `_id` to string once, in one helper, when passing data from server to client components. Do not pass raw ObjectId objects or huge arrays to client components.
7. **No N+1 patterns.** Search for queries inside loops or `.map()`. Replace with one query.

Verify: every Dashboard number still equals the matching number you compute by hand from the tabs.

### 13.9 Phase 5: Next.js Rendering

1. **Shrink client components.** Search for `'use client'`. Keep it only on components that truly need state, effects, or browser APIs (forms, modal, nav active state). Pages that only display data stay server components. Move `'use client'` down to the smallest possible component.
2. **Instant tab switching.** Add `loading.tsx` in `/app`, `/app/finance`, `/app/fleet`, and `/app/inventory` with a simple skeleton, so clicking a tab responds immediately while data loads.
3. **Dashboard streaming.** If the Dashboard has several slow cards, wrap independent cards in `<Suspense>` with a small fallback so one slow query does not block the whole page.
4. **Nav links.** Tabs must use `next/link` `<Link>` (not `<a>`) so routes are prefetched. In production, prefetching happens automatically for visible links.
5. **Fonts and images.** Use `next/font` for fonts (no `<link>` to Google Fonts). Use `next/image` for any image with explicit width and height. Remove unused images and fonts.
6. **Caching (optional, careful).** Default is no caching. If a query is cached for speed, **every** write handler (`POST`, `PUT`, `DELETE` in `/api/*`) must call the matching invalidation (`revalidatePath('/')`, `revalidatePath('/finance')`, and so on) in the same request. Test: add a COD record, then confirm the Dashboard shows the new total immediately. If there is any doubt, do not cache.
7. **Dependencies.** Run a project-wide search for unused imports and unused packages in `package.json`. Remove only what is proven unused.

### 13.10 Phase 6: Smooth Scrolling with Lenis (Do This After Phases 1–5)

Lenis makes scrolling feel smooth, but it **does not fix** a slow page. That is why it comes last. Install after the earlier phases so it does not hide real problems.

**Install**

```bash
npm install lenis
```

**1. Create `components/SmoothScroll.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  // Respect users who prefer reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnabled(!mq.matches);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
```

**2. Update `app/layout.tsx`**

- Add `import 'lenis/dist/lenis.css';` (global import, once).
- Wrap the content inside `<body>` with `<SmoothScroll>…</SmoothScroll>`. `layout.tsx` itself must stay a server component. Only `SmoothScroll` is a client component.
- Keep Nav inside or outside the wrapper, whichever it already is. Do not restructure the layout.

**3. Remove conflicts**

- Remove `scroll-smooth` and `scroll-behavior: smooth` (13.5).
- Do not set `overflow: hidden` on `html` or `body` permanently. The page must scroll on the window (Lenis `root` mode).

**4. Modal integration** (in `Modal.tsx`, a client component)

```tsx
import { useLenis } from 'lenis/react';

const lenis = useLenis();

useEffect(() => {
  if (!open) return;
  lenis?.stop();           // freeze background page scroll
  return () => lenis?.start();
}, [open, lenis]);
```

- Add `data-lenis-prevent` to the modal's own scrollable body (the element with `overflow-y-auto`), so a long form can still scroll natively.
- Add `data-lenis-prevent` to any other inner scroll container (for example, a table wrapper with `overflow-x-auto` or `overflow-auto`).

**5. Tuning**

- Start with `lerp: 0.1`. If it feels too floaty, raise it to `0.12`–`0.15`. If it feels too abrupt, lower it. Do not use large `duration` values; they feel slow.
- Do not add extra scroll-linked animations. They are not needed and will hurt performance.

**Verify**

- Mouse wheel and trackpad scrolling are smooth on all four tabs.
- Open a modal: the background does not scroll. A long modal body still scrolls. Close it: page scrolling resumes at the same position.
- Wide tables still scroll horizontally.
- Keyboard scrolling (Space, PageDown, arrows) and anchor behavior still work.
- No hydration warnings in the console.
- If Lenis causes any problem that cannot be fixed within a few attempts, remove it with `git revert` and report. Never leave the app half-integrated.

### 13.11 Manual Regression Checklist (Run After Every Phase)

Run `npm run build` (must pass), then verify by hand:

- [ ] All four tabs open: Dashboard, COD / Debit / Credit, Fleet, Inventory.
- [ ] Add, edit, and delete work in all three modules (3 modules × 3 actions = 9 checks). Data persists after a page reload.
- [ ] Validation still works (required fields, numbers, allowed status values).
- [ ] Filters (if present) still return correct results.
- [ ] Dashboard numbers match the tab data: COD pending, total debit and credit, vehicles per status, total items and quantity, low-stock count.
- [ ] Modals open, close (button, Escape, overlay), and keep correct values when editing.
- [ ] No new errors or warnings in the browser console or the terminal.
- [ ] Seed script still works on an empty database.
- [ ] `npm install && npm run dev` still works from a clean clone.

If any box fails, revert the last commit (13.2, rule 4).

### 13.12 Final Phase: Compare and Close

1. Rebuild and re-measure using the exact method from 13.4. Run `ANALYZE=true npm run build` again.
2. Compare before and after.

   | Metric                        | Target                                            |
   | ----------------------------- | ------------------------------------------------- |
   | Modal open (click to visible) | Under ~100 ms                                     |
   | Interaction latency (INP)     | Under 200 ms                                      |
   | Scrolling                     | Smooth, close to 60 fps, no long tasks over 50 ms |
   | Lighthouse Performance        | 90 or higher on all four tabs                     |
   | Layout shift (CLS)            | Under 0.1                                         |
   | First Load JS per route       | Equal to or smaller than baseline                 |

3. If a target is not met, list the most likely remaining cause and the next step. Do not make risky changes just to hit a number.
4. Merge `chore/optimize` to `main` only after the full checklist in 13.11 passes. Keep the `pre-optimize` tag.

### 13.13 Required Output: `OPTIMIZATION_REPORT.md`

The agent must create this file in the repo root, containing:

1. **Before and after** table (13.12).
2. **List of changes**, one line per commit, grouped by phase.
3. **Visual changes**, if any (for example, "replaced `backdrop-blur` with `bg-black/50` on the modal overlay").
4. **Libraries added**, with versions and the reason.
5. **Skipped steps**, with the reason (for example, "no pagination: only 40 rows").
6. **Remaining issues and recommendations.**
7. **Dev vs production note:** which problems appeared only in `npm run dev`.

### 13.14 Quick Do / Don't Summary

| Do                                                      | Don't                                                                    |
| ------------------------------------------------------- | ------------------------------------------------------------------------ |
| Measure on a production build                           | Judge performance only from `npm run dev`                                |
| One change, build, verify, commit                       | Batch many changes in one commit                                         |
| Mount modal content only when open                      | Keep hidden forms rendered                                               |
| Animate only `opacity` and `transform`                  | Use `transition-all` or animate size and position                        |
| Compute Dashboard from full collections on the database | Compute totals from paginated or client-side data                        |
| Invalidate any cache on every write                     | Cache anything without invalidation                                      |
| Add Lenis last, with modal and inner-scroll handling    | Use Lenis to hide a slow page, or leave modals scrolling the page behind |
| Revert fast when something breaks                       | Pile fixes on top of a broken change                                     |