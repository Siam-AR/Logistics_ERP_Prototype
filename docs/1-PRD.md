# Logistics ERP Prototype — PRD

**Product:** Logistics ERP (BisTech) · **Version:** 0.1 Prototype · **Status:** Draft

## 1. Purpose

Build a small, clean prototype that shows the core idea of the Logistics ERP: one place to see money owed, vehicles, and stock. It is the first step of the larger modular build that will replace the client's Oracle-based system. The prototype is for demonstration and feedback, not production use.

## 2. Scope Rules

- Only the 3 modules and the Dashboard listed below. Nothing else.
- Simple data entry (short forms, few fields) and simple output (tables and totals).
- No clutter: no extra menus, charts beyond the Dashboard summary cards, settings pages, or integrations.
- Anything not written in this document is out of scope.

## 3. Navigation

A single app with four tabs:

1. Dashboard
2. COD, Debit & Credit
3. Fleet
4. Inventory

## 4. Features

### 4.1 Dashboard (Overview)

Read-only summary. No data entry here.

- **Finance cards:** Total COD pending, total debit, total credit.
- **Fleet cards:** Total vehicles, number Available, number On Trip, number In Maintenance.
- **Inventory cards:** Total items, total stock quantity, number of low-stock items.
- Each card links to its tab.

### 4.2 COD, Debit & Credit Management

**Goal:** Track cash collected on delivery and what is owed to or by each party.

**Data entered (per entry):**

| Field | Type |
| --- | --- |
| Date | Date |
| Party name (customer / vendor) | Text |
| Type | COD / Debit / Credit |
| Amount | Number |
| Reference (order or note) | Text, optional |
| Status | Pending / Settled |

**Output:**

- A table of all entries, newest first.
- Totals at the top: COD pending, total debit, total credit.
- Filter by Type and Status.

**Actions:** Add entry, edit entry, mark as Settled, delete entry.

### 4.3 Fleet Management

**Goal:** Know which vehicles exist and what each one is doing.

**Data entered (per vehicle):**

| Field | Type |
| --- | --- |
| Vehicle number / plate | Text |
| Vehicle type | Text (e.g. truck, van) |
| Driver name | Text |
| Status | Available / On Trip / In Maintenance |
| Notes | Text, optional |

**Output:**

- A table of all vehicles with status.
- Count of vehicles per status.
- Filter by Status.

**Actions:** Add vehicle, edit vehicle, change status, delete vehicle.

### 4.4 Inventory Management

**Goal:** Know what stock is on hand and what is running low.

**Data entered (per item):**

| Field | Type |
| --- | --- |
| Item name | Text |
| SKU / code | Text |
| Quantity in stock | Number |
| Unit | Text (pcs, kg, box) |
| Low-stock level | Number |

**Output:**

- A table of all items with quantity.
- Items at or below the low-stock level are highlighted.
- Total items and total quantity.

**Actions:** Add item, edit item, adjust quantity (add / remove), delete item.

## 5. Non-Goals (Not in This Prototype)

- User accounts, roles, and permissions
- Order, shipment, route, or warehouse-location management
- Invoicing, payments, or accounting reports
- Fuel, maintenance scheduling, GPS tracking
- Notifications, exports, or imports
- Multi-language, multi-currency, or multi-branch
- Integration with Oracle or any other system

## 6. Design Guidelines

- Clean, minimal layout with a sidebar or top tab bar.
- One table and one short form per tab.
- Readable on desktop first; mobile is secondary.
- Use plain labels the operations team already understands.

## 7. Data & Technical Notes

- Three simple data collections: Finance entries, Vehicles, Inventory items.
- The Dashboard reads from the same data; it has no data of its own.
- Technology stack: to be decided (open question below).
- Sample data should be preloaded so the prototype can be demoed immediately.

## 8. Success Criteria

- A user can add, edit, and delete records in all three tabs.
- Dashboard numbers always match the data in the tabs.
- A new user understands every tab without training.
- The prototype can be walked through in under 10 minutes.
