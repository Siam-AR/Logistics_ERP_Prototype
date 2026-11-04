import { Suspense } from "react";
import { getDb } from "@/lib/db";
import { seedIfEmpty } from "@/lib/seed";
import type { InventoryItem } from "@/lib/types";
import Card from "@/components/inventory/Card";
import InventoryClient from "@/components/inventory/InventoryClient";
import { connection } from "next/server";

async function InventoryData() {
  await connection();
  const db = await getDb();
  await seedIfEmpty(db);
  const docs = await db.collection("inventory").find().sort({ name: 1 }).toArray();

  const items: InventoryItem[] = docs.map((d) => ({
    _id: d._id.toString(),
    name: d.name,
    sku: d.sku,
    quantity: d.quantity,
    unit: d.unit,
    lowStockLevel: d.lowStockLevel,
  }));

  const totalItems = items.length;
  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
  const lowCount = items.filter((i) => i.quantity <= i.lowStockLevel).length;

  return (
    <>
      <div className="mb-space-lg grid grid-cols-1 gap-gutter-desktop md:grid-cols-3">
        <Card label="Total Items" value={totalItems.toLocaleString()} suffix="Items" icon="category" />
        <Card label="Total Stock Quantity" value={totalQty.toLocaleString()} suffix="Units" icon="inventory_2" />
        <Card label="Low-Stock Items" value={lowCount.toLocaleString()} suffix="At or below level" icon="warning" danger />
      </div>
      <InventoryClient items={items} />
    </>
  );
}

export default function InventoryPage() {
  return (
    <>
      <div className="flex flex-col gap-0.5 py-space-lg">
        <h1 className="text-headline-lg tracking-tight">Inventory Management</h1>
        <p className="text-body-sm text-on-surface-variant">Know what stock is on hand and what is running low.</p>
      </div>

      <Suspense
        fallback={<p className="py-10 text-center text-body-sm text-on-surface-variant">Loading inventory...</p>}
      >
        <InventoryData />
      </Suspense>
    </>
  );
}