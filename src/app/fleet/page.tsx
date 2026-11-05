import { Suspense } from "react";
import { connection } from "next/server";
import { getDb } from "@/lib/db";
import { seedFleetIfEmpty } from "@/lib/seed";
import type { Vehicle } from "@/lib/types";
import FleetView from "@/components/fleet/FleetView";

export default function FleetPage() {
    return (
        <Suspense fallback={<FleetFallback />}>
            <FleetData />
        </Suspense>
    );
}

async function FleetData() {
    await connection();

    const db = await getDb();
    await seedFleetIfEmpty(db);

    const docs = await db
        .collection("vehicles")
        .find(
            {},
            {
                projection: {
                    plate: 1,
                    vehicleType: 1,
                    driver: 1,
                    status: 1,
                    notes: 1,
                },
            }
        )
        .sort({ _id: -1 })
        .toArray();
    const vehicles: Vehicle[] = docs.map((d) => ({
        _id: d._id.toString(),
        plate: d.plate,
        vehicleType: d.vehicleType,
        driver: d.driver,
        status: d.status,
        notes: d.notes ?? "",
    }));

    return <FleetView vehicles={vehicles} />;
}

function FleetFallback() {
    return (
        <div className="flex w-full flex-col pt-space-lg" aria-busy="true">
            <div className="flex flex-col justify-between gap-space-md pb-space-lg md:flex-row md:items-end">
                <div>
                    <h1 className="text-headline-xl text-on-surface">Fleet</h1>
                    <p className="text-body-sm text-on-surface-variant">
                        Which vehicles we have and what each one is doing.
                    </p>
                </div>
                <div className="h-9 w-32 animate-pulse rounded bg-surface-container-high" />
            </div>
            <div className="mb-space-lg grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                    <div
                        key={index}
                        className="h-28 animate-pulse rounded-xl bg-surface-container-low"
                    />
                ))}
            </div>
            <div className="h-72 animate-pulse rounded-xl bg-surface-container-low" />
        </div>
    );
}
