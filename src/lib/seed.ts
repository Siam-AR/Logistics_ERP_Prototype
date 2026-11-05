import type { Db } from "mongodb";
import type { NewFinanceEntry } from "./types";

const sampleItems = [
  { name: "Industrial Pallet Shrink Film 500mm", sku: "SKU-LOG-901", quantity: 45, unit: "roll", lowStockLevel: 50 },
  { name: "Corrugated Shipping Boxes (L)", sku: "SKU-LOG-114", quantity: 1420, unit: "pcs", lowStockLevel: 200 },
  { name: "Heavy-Duty Strapping Tape 50mm", sku: "SKU-LOG-883", quantity: 180, unit: "roll", lowStockLevel: 200 },
  { name: "Poly Bubble Mailers #4", sku: "SKU-LOG-205", quantity: 8500, unit: "pcs", lowStockLevel: 1000 },
  { name: "Wooden Euro Pallets Grade-A", sku: "SKU-LOG-044", quantity: 24, unit: "pallet", lowStockLevel: 50 },
  { name: "RFID Barcode Tracking Labels", sku: "SKU-LOG-512", quantity: 38751, unit: "pcs", lowStockLevel: 5000 },
  { name: "Packing Foam Sheets", sku: "SKU-LOG-320", quantity: 640, unit: "box", lowStockLevel: 100 },
  { name: "Industrial Cleaning Solvent", sku: "SKU-LOG-777", quantity: 90, unit: "kg", lowStockLevel: 120 },
];

const sampleFinanceEntries: NewFinanceEntry[] = [
  {
    date: "2024-10-24",
    partyName: "Apex Global Retail",
    partyNote: "Dispatcher: Route #401B",
    type: "COD",
    reference: "ORD-8921-X",
    amount: 14250,
    status: "PENDING",
  },
  {
    date: "2024-10-23",
    partyName: "Metro Freight Hub",
    partyNote: "Net 15 Master Billed",
    type: "DEBIT",
    reference: "INV-4029-C",
    amount: 36800,
    status: "SETTLED",
  },
  {
    date: "2024-10-22",
    partyName: "Nordic Parts Ltd",
    partyNote: "OEM Braking Kits & Hydraulic",
    type: "CREDIT",
    reference: "FUEL-DEPOT-12",
    amount: 18400,
    status: "PENDING",
  },
  {
    date: "2024-10-21",
    partyName: "SwiftCart Logistics",
    partyNote: "Last Mile Hub Dispatch",
    type: "COD",
    reference: "ORD-9014-F",
    amount: 19700,
    status: "PENDING",
  },
  {
    date: "2024-10-20",
    partyName: "Zenith Electronics",
    partyNote: "Contract Cargo Express",
    type: "DEBIT",
    reference: "INV-3882-K",
    amount: 49600,
    status: "SETTLED",
  },
  {
    date: "2024-10-19",
    partyName: "Starlight Warehousing",
    partyNote: "Cold-Chain Storage Bays 1-4",
    type: "CREDIT",
    reference: "BAY-LEASE-99",
    amount: 12850,
    status: "SETTLED",
  },
  {
    date: "2024-10-18",
    partyName: "Apex Global Retail",
    partyNote: "Pallet Dropoff North Dock",
    type: "COD",
    reference: "ORD-8710-P",
    amount: 8900,
    status: "SETTLED",
  },
];

// Preloads sample data the first time the collection is empty.
export async function seedIfEmpty(db: Db) {
  const col = db.collection("inventory");
  if ((await col.estimatedDocumentCount()) === 0) {
    await col.insertMany(sampleItems.map((i) => ({ ...i })));
  }
}

export async function seedFinanceIfEmpty(db: Db) {
  const col = db.collection("finance");
  if ((await col.estimatedDocumentCount()) === 0) {
    await col.insertMany(sampleFinanceEntries.map((e) => ({ ...e })));
  }
}
