import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { parseItem } from "@/lib/validate";

export async function POST(req: Request) {
  const parsed = parseItem(await req.json().catch(() => null), false);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const col = (await getDb()).collection("inventory");
  if (await col.findOne({ sku: parsed.data.sku })) {
    return NextResponse.json({ error: "This SKU already exists" }, { status: 409 });
  }
  const res = await col.insertOne(parsed.data);
  return NextResponse.json({ id: res.insertedId.toString() }, { status: 201 });
}
