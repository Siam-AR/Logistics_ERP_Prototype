"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/component/Modal";
import Table, { type Column } from "@/component/Table";
import VehicleForm from "./VehicleForm";
import {
    VEHICLE_STATUSES,
    type Vehicle,
    type VehicleInput,
    type VehicleStatus,
} from "@/lib/types";

const BADGE: Record<VehicleStatus, string> = {
    Available: "bg-emerald-50 text-emerald-700",
    "On Trip": "bg-blue-50 text-blue-700",
    "In Maintenance": "bg-amber-50 text-amber-700",
};

export default function FleetView({ vehicles }: { vehicles: Vehicle[] }) {
    const router = useRouter();
    const [modal, setModal] = useState<{ vehicle: Vehicle | null } | null>(
        null,
    );

    async function send(url: string, method: string, body?: unknown) {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!res.ok) alert("Something went wrong. Please try again.");
        router.refresh();
    }

    async function save(data: VehicleInput) {
        const editing = modal?.vehicle;
        await send(
            editing ? `/api/fleet/${editing._id}` : "/api/fleet",
            editing ? "PUT" : "POST",
            data,
        );
        setModal(null);
    }

    const changeStatus = (v: Vehicle, status: string) => {
        const { _id, ...rest } = v;
        return send(`/api/fleet/${_id}`, "PUT", { ...rest, status });
    };

    const remove = (v: Vehicle) => {
        if (confirm(`Delete vehicle ${v.plate}?`))
            send(`/api/fleet/${v._id}`, "DELETE");
    };

    const columns: Column<Vehicle>[] = [
        {
            header: "Plate",
            cell: (v) => (
                <span className="font-mono font-medium">{v.plate}</span>
            ),
        },
        { header: "Type", cell: (v) => v.vehicleType },
        { header: "Driver", cell: (v) => v.driver },
        {
            header: "Status",
            cell: (v) => (
                <select
                    value={v.status}
                    onChange={(e) => changeStatus(v, e.target.value)}
                    className={`rounded-full border-0 px-3 py-1 text-xs font-medium ${BADGE[v.status]}`}
                >
                    {VEHICLE_STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
            ),
        },
        {
            header: "Notes",
            cell: (v) => <span className="text-slate-500">{v.notes}</span>,
        },
        {
            header: "",
            className: "text-right whitespace-nowrap",
            cell: (v) => (
                <>
                    <button
                        onClick={() => setModal({ vehicle: v })}
                        className="mr-3 text-slate-600 hover:text-slate-900"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => remove(v)}
                        className="text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                </>
            ),
        },
    ];

    return (
        <>
            <div className="mb-3 flex justify-end">
                <button
                    onClick={() => setModal({ vehicle: null })}
                    className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
                >
                    + Add vehicle
                </button>
            </div>

            <Table columns={columns} rows={vehicles} empty="No vehicles yet." />

            {modal && (
                <Modal
                    title={modal.vehicle ? "Edit vehicle" : "Add vehicle"}
                    onClose={() => setModal(null)}
                >
                    <VehicleForm
                        vehicle={modal.vehicle}
                        onSubmit={save}
                        onCancel={() => setModal(null)}
                    />
                </Modal>
            )}
        </>
    );
}
