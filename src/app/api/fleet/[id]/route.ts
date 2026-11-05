import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { parseVehicle } from "@/lib/validate";

type Ctx = { params: Promise<{ id: string }> };

// PUT /api/fleet/[id] — update (partial allowed, e.g. { status } only)
export async function PUT(req: Request, { params }: Ctx) {
    const { id } = await params;
    if (!ObjectId.isValid(id))
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const body = await req.json().catch(() => null);
    const result = parseVehicle(body, true);
    if (!result.ok)
        return NextResponse.json({ error: result.error }, { status: 400 });

    const db = await getDb();
    const res = await db
        .collection("vehicles")
        .updateOne({ _id: new ObjectId(id) }, { $set: result.data });
    if (res.matchedCount === 0)
        return NextResponse.json(
            { error: "Vehicle not found" },
            { status: 404 },
        );
    return NextResponse.json({ ok: true });
}

// DELETE /api/fleet/[id]
export async function DELETE(_req: Request, { params }: Ctx) {
    const { id } = await params;
    if (!ObjectId.isValid(id))
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const db = await getDb();
    const res = await db
        .collection("vehicles")
        .deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0)
        return NextResponse.json(
            { error: "Vehicle not found" },
            { status: 404 },
        );
    return NextResponse.json({ ok: true });
}
