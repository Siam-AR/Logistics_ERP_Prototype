import type { EntryStatus, EntryType } from "./types";

const typeStyles: Record<EntryType, string> = {
    COD: "bg-surface-container-high text-on-surface",
    DEBIT: "bg-surface-container-low text-secondary",
    CREDIT: "bg-surface-container-high text-on-surface",
};

export function TypeBadge({ type }: { type: EntryType }) {
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-lg font-label-sm text-label-sm font-semibold tracking-wide ${typeStyles[type]}`}
        >
            {type}
        </span>
    );
}

export function StatusBadge({ status }: { status: EntryStatus }) {
    const settled = status === "SETTLED";
    return (
        <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold ${
                settled
                    ? "bg-surface-container-low text-secondary"
                    : "bg-surface-container text-on-surface"
            }`}
        >
            <span className="material-symbols-outlined text-[13px]">
                {settled ? "check_circle" : "schedule"}
            </span>
            {status}
        </span>
    );
}
