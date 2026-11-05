"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type {
    NewVehicle,
    Vehicle,
    VehicleFilter,
    VehicleStatus,
} from "@/lib/types";
import KpiCards from "./KpiCards";
import VehicleModal from "./VehicleModal";
import VehicleTable from "./VehicleTable";

const FILTERS: VehicleFilter[] = [
    "ALL",
    "Available",
    "On Trip",
    "In Maintenance",
];

// Writes go through the API, then the server page is refreshed (TAD §3).
async function send(
    url: string,
    method: string,
    body?: unknown,
): Promise<string | null> {
    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (res.ok) return null;
        const json = await res.json().catch(() => ({}));
        return json.error ?? "Request failed";
    } catch {
        return "Network error";
    }
}

export default function FleetView({ vehicles }: { vehicles: Vehicle[] }) {
    const router = useRouter();
    const [filter, setFilter] = useState<VehicleFilter>("ALL");
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState<{ vehicle: Vehicle | null } | null>(
        null,
    );

    const countOf = (f: VehicleFilter) =>
        f === "ALL"
            ? vehicles.length
            : vehicles.filter((v) => v.status === f).length;

    const visible = useMemo(() => {
        const term = search.toLowerCase().trim();
        return vehicles.filter(
            (v) =>
                (filter === "ALL" || v.status === filter) &&
                (!term ||
                    [v.plate, v.vehicleType, v.driver].some((s) =>
                        s.toLowerCase().includes(term),
                    )),
        );
    }, [vehicles, filter, search]);

    async function save(data: NewVehicle) {
        const editing = modal?.vehicle;
        const err = await send(
            editing ? `/api/fleet/${editing._id}` : "/api/fleet",
            editing ? "PUT" : "POST",
            data,
        );
        if (err) return err;
        setModal(null);
        router.refresh();
        return null;
    }

    async function changeStatus(v: Vehicle, status: VehicleStatus) {
        const err = await send(`/api/fleet/${v._id}`, "PUT", { status });
        if (err) alert(err);
        router.refresh();
    }

    async function remove(v: Vehicle) {
        if (!confirm(`Delete vehicle ${v.plate}?`)) return;
        const err = await send(`/api/fleet/${v._id}`, "DELETE");
        if (err) alert(err);
        router.refresh();
    }

    return (
        <div className="flex w-full flex-col pt-space-lg">
            <div className="flex flex-col justify-between gap-space-md pb-space-lg md:flex-row md:items-end">
                <div>
                    <h1 className="text-headline-xl text-on-surface">Fleet</h1>
                    <p className="text-body-sm text-on-surface-variant">
                        Which vehicles we have and what each one is doing.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setModal({ vehicle: null })}
                    className="flex h-9 shrink-0 items-center gap-1.5 rounded bg-primary px-space-lg text-label-md text-on-primary shadow-md transition-all hover:bg-primary-container"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        add
                    </span>
                    Add Vehicle
                </button>
            </div>

            <KpiCards vehicles={vehicles} />

            <div className="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
                <div className="flex flex-col items-stretch justify-between gap-space-md p-space-lg lg:flex-row lg:items-center">
                    <div className="flex items-center gap-1 overflow-x-auto rounded-lg bg-surface-container-low p-1">
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setFilter(f)}
                                className={`shrink-0 rounded px-3.5 py-1.5 text-label-md transition-all ${
                                    filter === f
                                        ? "bg-surface-container-lowest font-semibold text-on-surface shadow-sm"
                                        : "text-on-surface-variant hover:text-on-surface"
                                }`}
                            >
                                {f === "ALL" ? "All" : f} ({countOf(f)})
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full max-w-sm">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline">
                            search
                        </span>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search plate, driver, or vehicle type..."
                            className="h-9 w-full rounded bg-surface-container-low pl-9 pr-8 text-body-sm text-on-surface shadow-sm transition-all placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                            >
                                <span className="material-symbols-outlined text-[16px]">
                                    close
                                </span>
                            </button>
                        )}
                    </div>
                </div>

                <VehicleTable
                    vehicles={visible}
                    onStatusChange={changeStatus}
                    onEdit={(v) => setModal({ vehicle: v })}
                    onDelete={remove}
                />

                <div className="bg-surface-container-low px-space-lg py-space-md text-label-md text-on-surface-variant">
                    Showing{" "}
                    <strong className="text-on-surface">
                        {visible.length}
                    </strong>{" "}
                    of{" "}
                    <strong className="text-on-surface">
                        {vehicles.length}
                    </strong>{" "}
                    vehicles
                </div>
            </div>

            {modal && (
                <VehicleModal
                    key={modal.vehicle?._id ?? "new"}
                    vehicle={modal.vehicle}
                    onClose={() => setModal(null)}
                    onSubmit={save}
                />
            )}
        </div>
    );
}
