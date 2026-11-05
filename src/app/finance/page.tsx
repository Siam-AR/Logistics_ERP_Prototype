import { Suspense } from "react";
import { connection } from "next/server";
import { getDb } from "@/lib/db";
import { seedFinanceIfEmpty } from "@/lib/seed";
import type { FinanceEntry } from "@/lib/types";
import FinanceLedger from "@/components/finance/FinanceLedger";

async function FinanceData() {
  await connection();
  const db = await getDb();
  await seedFinanceIfEmpty(db);

  const docs = await db.collection("finance").find().sort({ date: -1 }).toArray();

  const initialEntries: FinanceEntry[] = docs.map((d) => ({
    _id: d._id.toString(),
    date: d.date,
    partyName: d.partyName,
    partyNote: d.partyNote,
    type: d.type,
    reference: d.reference,
    amount: d.amount,
    status: d.status,
  }));

  return <FinanceLedger initialEntries={initialEntries} />;
}

export default function FinancePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <p className="text-body-sm text-on-surface-variant">Loading finance ledger...</p>
        </div>
      }
    >
      <FinanceData />
    </Suspense>
  );
}
