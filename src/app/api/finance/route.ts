import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import type { NewFinanceEntry } from "@/lib/types";

export async function GET() {
  try {
    const db = await getDb();
    const docs = await db.collection("finance").find().sort({ date: -1 }).toArray();
    const entries = docs.map((d) => ({
      _id: d._id.toString(),
      date: d.date,
      partyName: d.partyName,
      partyNote: d.partyNote,
      type: d.type,
      reference: d.reference,
      amount: d.amount,
      status: d.status,
    }));
    return NextResponse.json(entries);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch finance entries";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<NewFinanceEntry>;
    if (!body.partyName || !body.type || !body.date || typeof body.amount !== "number") {
      return NextResponse.json({ error: "Missing or invalid required fields" }, { status: 400 });
    }

    const col = (await getDb()).collection("finance");
    const doc = {
      date: body.date,
      partyName: body.partyName.trim(),
      partyNote: body.partyNote?.trim() || "",
      type: body.type,
      reference: body.reference?.trim() || `MANUAL-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: body.amount,
      status: body.status || "PENDING",
    };

    const res = await col.insertOne(doc);
    return NextResponse.json({ _id: res.insertedId.toString(), ...doc }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create finance entry";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
