"use client";

import { useState } from "react";
import { VEHICLE_STATUSES, type Vehicle, type VehicleInput } from "@/lib/types";

const input =
    "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none";

export default function VehicleForm({
    vehicle,
    onSubmit,
    onCancel,
}: {
    vehicle: Vehicle | null;
    onSubmit: (data: VehicleInput) => Promise<void>;
    onCancel: () => void;
}) {
    const [form, setForm] = useState<VehicleInput>({
        plate: vehicle?.plate ?? "",
        vehicleType: vehicle?.vehicleType ?? "",
        driver: vehicle?.driver ?? "",
        status: vehicle?.status ?? "Available",
        notes: vehicle?.notes ?? "",
    });
    const [saving, setSaving] = useState(false);
    const set = (k: keyof VehicleInput, v: string) =>
        setForm((f) => ({ ...f, [k]: v }));

    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                await onSubmit(form);
                setSaving(false);
            }}
        >
            <label className="text-sm">
                Vehicle number / plate
                <input
                    required
                    className={input}
                    value={form.plate}
                    onChange={(e) => set("plate", e.target.value)}
                />
            </label>
            <label className="text-sm">
                Vehicle type
                <input
                    required
                    className={input}
                    placeholder="e.g. truck, van"
                    value={form.vehicleType}
                    onChange={(e) => set("vehicleType", e.target.value)}
                />
            </label>
            <label className="text-sm">
                Driver name
                <input
                    required
                    className={input}
                    value={form.driver}
                    onChange={(e) => set("driver", e.target.value)}
                />
            </label>
            <label className="text-sm">
                Status
                <select
                    className={input}
                    value={form.status}
                    onChange={(e) => set("status", e.target.value)}
                >
                    {VEHICLE_STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
            </label>
            <label className="text-sm">
                Notes <span className="text-slate-400">(optional)</span>
                <textarea
                    rows={2}
                    className={input}
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                />
            </label>
            <div className="mt-2 flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
                >
                    Cancel
                </button>
                <button
                    disabled={saving}
                    className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700 disabled:opacity-60"
                >
                    {saving ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    );
}
