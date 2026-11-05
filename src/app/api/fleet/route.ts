import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { parseVehicle } from "@/lib/validate";

// POST /api/fleet — create a vehicle
export async function POST(req: Request) {
    const body = await req.json().catch(() => null);
    const result = parseVehicle(body, false);
    if (!result.ok)
        return NextResponse.json({ error: result.error }, { status: 400 });

    const db = await getDb();
    const res = await db.collection("vehicles").insertOne({ ...result.data });
    return NextResponse.json(
        { _id: res.insertedId.toString() },
        { status: 201 },
    );
}
