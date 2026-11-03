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
