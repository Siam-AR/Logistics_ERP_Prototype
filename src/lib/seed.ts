import type { Db } from "mongodb";

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

// Preloads sample data the first time the collection is empty.
export async function seedIfEmpty(db: Db) {
  const col = db.collection("inventory");
  if ((await col.estimatedDocumentCount()) === 0) {
    await col.insertMany(sampleItems.map((i) => ({ ...i })));
  }
}
