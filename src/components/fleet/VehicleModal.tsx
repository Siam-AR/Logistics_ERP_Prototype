"use client";

import { useState } from "react";
import { VEHICLE_STATUSES, type NewVehicle, type Vehicle } from "@/lib/types";
import { STATUS_STYLES } from "./status";

interface Props {
    vehicle: Vehicle | null; // null = add mode
    onClose: () => void;
    onSubmit: (data: NewVehicle) => Promise<string | null>; // returns error message, or null on success
}

const field =
    "w-full h-9 rounded bg-surface-container-low px-3 text-body-md text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary";
const label = "text-label-md font-semibold text-on-surface";
const TYPE_SUGGESTIONS = [
    "Truck",
    "Van",
    "Heavy Duty Semi-Truck",
    "Refrigerated Box Truck",
    "Flatbed Hauler",
    "Cargo Van",
];

export default function VehicleModal({ vehicle, onClose, onSubmit }: Props) {
    const isEdit = !!vehicle;
    const [form, setForm] = useState<NewVehicle>({
        plate: vehicle?.plate ?? "",
        vehicleType: vehicle?.vehicleType ?? "",
        driver: vehicle?.driver ?? "",
        status: vehicle?.status ?? "Available",
        notes: vehicle?.notes ?? "",
    });
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const set = <K extends keyof NewVehicle>(k: K, v: NewVehicle[K]) =>
        setForm((f) => ({ ...f, [k]: v }));

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setError(null);
        const err = await onSubmit(form);
        setSaving(false);
        if (err) setError(err);
    }

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/40 p-4 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-2xl">
                <div className="flex items-center justify-between bg-surface-container-low px-space-lg py-space-md">
                    <h3 className="text-headline-sm text-on-surface">
                        {isEdit ? "Edit Vehicle" : "Add Vehicle"}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-outline hover:text-on-surface"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            close
                        </span>
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-space-md overflow-y-auto p-space-lg"
                >
                    <div className="flex flex-col gap-1.5">
                        <label className={label} htmlFor="v-plate">
                            Vehicle number / plate{" "}
                            <span className="text-error">*</span>
                        </label>
                        <input
                            id="v-plate"
                            required
                            autoFocus
                            value={form.plate}
                            onChange={(e) =>
                                set("plate", e.target.value.toUpperCase())
                            }
                            placeholder="e.g. TRK-9021-TX"
                            className={`${field} font-mono uppercase`}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className={label} htmlFor="v-type">
                            Vehicle type <span className="text-error">*</span>
                        </label>
                        <input
                            id="v-type"
                            required
                            list="vehicle-types"
                            value={form.vehicleType}
                            onChange={(e) => set("vehicleType", e.target.value)}
                            placeholder="e.g. truck, van"
                            className={field}
                        />
                        <datalist id="vehicle-types">
                            {TYPE_SUGGESTIONS.map((t) => (
                                <option key={t} value={t} />
                            ))}
                        </datalist>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className={label} htmlFor="v-driver">
                            Driver name <span className="text-error">*</span>
                        </label>
                        <input
                            id="v-driver"
                            required
                            value={form.driver}
                            onChange={(e) => set("driver", e.target.value)}
                            placeholder="e.g. Marcus Vance"
                            className={field}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <span className={label}>
                            Status <span className="text-error">*</span>
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                            {VEHICLE_STATUSES.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => set("status", s)}
                                    className={`flex flex-col items-center justify-center gap-1 rounded-lg p-2 text-label-md transition-all ${
                                        form.status === s
                                            ? "bg-surface-container font-semibold text-on-surface"
                                            : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                                    }`}
                                >
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${STATUS_STYLES[s].dot}`}
                                    />
                                    <span>
                                        {s === "In Maintenance"
                                            ? "In Maint."
                                            : s}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            className={`${label} flex items-center justify-between`}
                            htmlFor="v-notes"
                        >
                            <span>Notes</span>
                            <span className="text-label-sm font-normal text-outline">
                                Optional
                            </span>
                        </label>
                        <textarea
                            id="v-notes"
                            rows={3}
                            value={form.notes}
                            onChange={(e) => set("notes", e.target.value)}
                            placeholder="e.g. Scheduled return 18:00"
                            className="w-full resize-none rounded bg-surface-container-low p-2.5 text-body-sm text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                    </div>

                    {error && (
                        <p className="rounded bg-error-container px-3 py-2 text-body-sm text-on-error-container">
                            {error}
                        </p>
                    )}

                    <div className="flex items-center justify-end gap-space-sm pt-space-sm">
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-9 rounded bg-surface-container px-space-md text-label-md text-on-surface transition-colors hover:bg-surface-container-high"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex h-9 items-center gap-1.5 rounded bg-primary px-space-lg text-label-md text-on-primary shadow-md transition-all hover:bg-primary-container disabled:opacity-60"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                save
                            </span>
                            {saving ? "Saving..." : "Save Vehicle"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
