import { VEHICLE_STATUSES } from "./types";

type Result =
    | { ok: true; data: Record<string, string | number> }
    | { ok: false; error: string };

// Basic validation. partial=true allows updating only some fields.
export function parseItem(body: unknown, partial: boolean): Result {
    if (typeof body !== "object" || body === null)
        return { ok: false, error: "Invalid request body" };
    const b = body as Record<string, unknown>;
    const data: Record<string, string | number> = {};

    for (const key of ["name", "sku", "unit"] as const) {
        const v = b[key];
        if (v === undefined) {
            if (!partial) return { ok: false, error: `${key} is required` };
            continue;
        }
        if (typeof v !== "string" || !v.trim())
            return { ok: false, error: `${key} must be a non-empty text` };
        data[key] = key === "sku" ? v.trim().toUpperCase() : v.trim();
    }

    for (const key of ["quantity", "lowStockLevel"] as const) {
        const v = b[key];
        if (v === undefined) {
            if (!partial) return { ok: false, error: `${key} is required` };
            continue;
        }
        if (typeof v !== "number" || !Number.isFinite(v) || v < 0) {
            return { ok: false, error: `${key} must be a number (0 or more)` };
        }
        data[key] = v;
    }

    if (partial && Object.keys(data).length === 0)
        return { ok: false, error: "Nothing to update" };
    return { ok: true, data };
}

// Vehicles: plate, vehicleType, driver, status required; notes optional.
export function parseVehicle(body: unknown, partial: boolean): Result {
    if (typeof body !== "object" || body === null)
        return { ok: false, error: "Invalid request body" };
    const b = body as Record<string, unknown>;
    const data: Record<string, string | number> = {};

    for (const key of ["plate", "vehicleType", "driver"] as const) {
        const v = b[key];
        if (v === undefined) {
            if (!partial) return { ok: false, error: `${key} is required` };
            continue;
        }
        if (typeof v !== "string" || !v.trim())
            return { ok: false, error: `${key} must be a non-empty text` };
        data[key] = key === "plate" ? v.trim().toUpperCase() : v.trim();
    }

    if (b.status === undefined) {
        if (!partial) return { ok: false, error: "status is required" };
    } else {
        if (
            !VEHICLE_STATUSES.includes(
                b.status as (typeof VEHICLE_STATUSES)[number],
            )
        ) {
            return {
                ok: false,
                error: `status must be one of: ${VEHICLE_STATUSES.join(", ")}`,
            };
        }
        data.status = b.status as string;
    }

    if (b.notes === undefined) {
        if (!partial) data.notes = "";
    } else {
        if (typeof b.notes !== "string")
            return { ok: false, error: "notes must be text" };
        data.notes = b.notes.trim();
    }

    if (partial && Object.keys(data).length === 0)
        return { ok: false, error: "Nothing to update" };
    return { ok: true, data };
}
