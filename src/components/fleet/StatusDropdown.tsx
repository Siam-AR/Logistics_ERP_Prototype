"use client";

import { useEffect, useRef, useState } from "react";
import { VEHICLE_STATUSES, type VehicleStatus } from "@/lib/types";
import { STATUS_STYLES } from "./status";

export default function StatusDropdown({
    status,
    onChange,
}: {
    status: VehicleStatus;
    onChange: (s: VehicleStatus) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const s = STATUS_STYLES[status];

    useEffect(() => {
        if (!open) return;
        const close = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [open]);

    return (
        <div ref={ref} className="relative inline-block text-left">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-sm uppercase shadow-sm transition-opacity hover:opacity-90 ${s.bg} ${s.text}`}
            >
                <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                <span>{status}</span>
                <span className="material-symbols-outlined text-[14px]">
                    expand_more
                </span>
            </button>
            {open && (
                <div className="absolute left-1/2 z-30 mt-1 w-44 -translate-x-1/2 rounded-lg bg-surface-container-lowest p-1 text-body-sm shadow-xl">
                    {VEHICLE_STATUSES.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => {
                                setOpen(false);
                                if (opt !== status) onChange(opt);
                            }}
                            className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-on-surface hover:bg-surface-container-low"
                        >
                            <span
                                className={`h-2 w-2 rounded-full ${STATUS_STYLES[opt].dot}`}
                            />
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
