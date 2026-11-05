import { formatCurrency } from "@/lib/format";
import type { FinanceEntry } from "@/lib/types";

interface KpiCardProps {
    label: string;
    hint: string;
    value: string;
    meta: string;
    icon: string;
    tone?: string;
    dark?: boolean;
}

function KpiCard({
    label,
    hint,
    value,
    meta,
    icon,
    tone = "text-on-surface-variant",
    dark,
}: KpiCardProps) {
    return (
        <div
            className={`rounded-xl p-space-lg shadow-sm flex flex-col justify-between ${
                dark
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-lowest"
            }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0.5">
                    <span
                        className={`font-label-md text-label-md uppercase tracking-wider ${
                            dark
                                ? "text-on-primary-container"
                                : "text-on-surface-variant"
                        }`}
                    >
                        {label}
                    </span>
                    <span
                        className={`font-data-mono text-label-sm font-medium ${dark ? "text-tertiary-fixed" : tone}`}
                    >
                        {hint}
                    </span>
                </div>
                <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        dark
                            ? "bg-primary-container text-tertiary-fixed"
                            : `bg-surface-container-low ${tone}`
                    }`}
                >
                    <span className="material-symbols-outlined text-[20px]">
                        {icon}
                    </span>
                </div>
            </div>
            <div className="mt-space-md flex flex-col gap-2">
                <div
                    className={`font-headline-xl text-headline-xl font-semibold tracking-tight ${
                        dark ? "text-tertiary-fixed" : "text-on-surface"
                    }`}
                >
                    {value}
                </div>
                <span
                    className={`font-data-mono text-label-sm ${
                        dark
                            ? "text-on-primary-container"
                            : "text-on-surface-variant"
                    }`}
                >
                    {meta}
                </span>
            </div>
        </div>
    );
}

export default function FinanceKpiCards({
    entries,
}: {
    entries: FinanceEntry[];
}) {
    const pending = entries.filter((e) => e.status === "PENDING");
    const sum = (type: FinanceEntry["type"]) =>
        pending
            .filter((e) => e.type === type)
            .reduce((s, e) => s + e.amount, 0);
    const count = (type: FinanceEntry["type"]) =>
        pending.filter((e) => e.type === type).length;

    const cod = sum("COD");
    const debit = sum("DEBIT");
    const credit = sum("CREDIT");
    const net = debit - credit;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md my-space-sm">
            <KpiCard
                label="COD Pending"
                hint="In-Transit Drivers"
                value={formatCurrency(cod)}
                meta={`${count("COD")} open shipments`}
                icon="local_shipping"
            />
            <KpiCard
                label="Total Debit (Receivables)"
                hint="Owed by Customers"
                value={formatCurrency(debit)}
                meta={`${count("DEBIT")} pending entries`}
                icon="north_east"
                tone="text-secondary"
            />
            <KpiCard
                label="Total Credit (Payables)"
                hint="Owed to Vendors"
                value={formatCurrency(credit)}
                meta={`${count("CREDIT")} pending entries`}
                icon="south_west"
                tone="text-error"
            />
            <KpiCard
                dark
                label="Net Operating Balance"
                hint="Debit - Credit Position"
                value={`${net >= 0 ? "+" : "-"}${formatCurrency(Math.abs(net))}`}
                meta={net >= 0 ? "Surplus" : "Deficit"}
                icon="account_balance"
            />
        </div>
    );
}
