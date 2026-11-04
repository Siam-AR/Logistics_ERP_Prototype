import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { parseItem } from "@/lib/validate";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const parsed = parseItem(await req.json().catch(() => null), true);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const col = (await getDb()).collection("inventory");
  const _id = new ObjectId(id);

  if (parsed.data.sku) {
    const dup = await col.findOne({ sku: parsed.data.sku, _id: { $ne: _id } });
    if (dup) return NextResponse.json({ error: "This SKU already exists" }, { status: 409 });
  }

  const res = await col.updateOne({ _id }, { $set: parsed.data });
  if (res.matchedCount === 0) return NextResponse.json({ error: "Item not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const res = await (await getDb()).collection("inventory").deleteOne({ _id: new ObjectId(id) });
  if (res.deletedCount === 0) return NextResponse.json({ error: "Item not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
