# Logistics ERP Prototype

A small, focused prototype of a logistics management system. It has one Dashboard and three simple modules: money (COD, debit, credit), fleet, and inventory. Simple data goes in, simple numbers and tables come out. Nothing else.

This is the first step of the larger modular Logistics ERP build. It is for demo and feedback, not production use.

## Features

| Tab                     | What it does                                                                                               |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Dashboard**           | Read-only overview: pending COD, total debit and credit, vehicles per status, total stock, low-stock count |
| **COD, Debit & Credit** | Add, edit, settle, and delete finance entries. Filter by type and status. Totals at the top                |
| **Fleet**               | Add, edit, and delete vehicles. Track status: Available, On Trip, In Maintenance                           |
| **Inventory**           | Add, edit, and delete items. Adjust quantity. Low-stock items are highlighted                              |

Anything not listed here is out of scope: no login or roles, no orders or routes, no invoicing, no GPS, no exports, no integrations.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- MongoDB (official `mongodb` Node driver, no ODM)

No other libraries beyond what these four require.

## Getting Started

### Prerequisites

- Node.js (current LTS)
- A MongoDB database (local, or a free hosted cluster)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.local.example .env.local
# then replace the placeholders in MONGODB_URI with your MongoDB Atlas connection details

# 3. (Optional) Load sample data
npm run seed

# 4. Start the app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable      | Description                                      |
| ------------- | ------------------------------------------------ |
| `MONGODB_URI` | MongoDB connection string (including Atlas host) |
| `MONGODB_DB`  | Database name (defaults to `logistics_erp`)      |

## Project Structure

```
/app
  layout.tsx               Shared layout with tab navigation
  page.tsx                 Dashboard
  finance/page.tsx         COD, Debit & Credit tab
  fleet/page.tsx           Fleet tab
  inventory/page.tsx       Inventory tab
  api/                     Create / update / delete route handlers per module
/components                Nav, Card, Table, Modal
/lib
  db.ts                    MongoDB connection
  types.ts                 FinanceEntry, Vehicle, InventoryItem
  seed.ts                  Sample data script
```

## How It Works

- **Reading:** pages are server components that query MongoDB directly and render the result.
- **Writing:** forms call simple route handlers (`POST`, `PUT`, `DELETE`), then the page refreshes.
- **Dashboard:** computes its numbers from the same three collections (`finance`, `vehicles`, `inventory`). It stores nothing of its own.

## Documentation

- **PRD:** Logistics ERP Prototype PRD v0.1 (what we build and what we do not)
- **TAD:** Logistics ERP Prototype TAD v0.1 (architecture, data model, API, work split)

## Team Workflow

Three developers, six hours. Each developer owns one module end to end (page, form, API, types) to avoid merge conflicts.

| Branch           | Module                  |
| ---------------- | ----------------------- |
| `feature/finance`   | COD, Debit & Credit     |
| `feature/fleet`     | Fleet                   |
| `feature/inventory` | Inventory and Dashboard |

Merge to `main` at the agreed checkpoints. Touch only your own folders, except the shared files (`lib/types.ts`, `components/`).

## Definition of Done

- All four tabs open and work
- Add, edit, and delete work in all three modules
- Dashboard numbers match the tab data
- Sample data is preloaded
- App runs locally with `npm install` and `npm run dev`
