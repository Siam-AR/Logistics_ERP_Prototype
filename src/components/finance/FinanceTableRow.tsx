import { StatusBadge, TypeBadge } from "./FinanceBadges";
import { formatCurrency, formatDate, getInitials } from "@/lib/format";
import type { EntryType, FinanceEntry } from "@/lib/types";

const amountColor: Record<EntryType, string> = {
    COD: "text-on-surface",
    DEBIT: "text-secondary",
    CREDIT: "text-error",
};

interface Props {
    entry: FinanceEntry;
    onSettle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function FinanceTableRow({ entry, onSettle, onDelete }: Props) {
    const settled = entry.status === "SETTLED";

    return (
        <tr
            className={`h-12 hover:bg-surface-container-low/60 transition-colors ${
                settled ? "bg-surface-container-low/20" : ""
            }`}
        >
            <td className="pl-space-lg pr-space-md py-2 font-data-mono text-label-md text-on-surface-variant whitespace-nowrap">
                {formatDate(entry.date)}
            </td>
            <td className="px-space-md py-2 font-medium whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-md bg-surface-container flex items-center justify-center font-label-sm text-on-surface font-semibold">
                        {getInitials(entry.partyName)}
                    </span>
                    <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface">
                            {entry.partyName}
                        </span>
                        {entry.partyNote && (
                            <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                                {entry.partyNote}
                            </span>
                        )}
                    </div>
                </div>
            </td>
            <td className="px-space-md py-2 text-center whitespace-nowrap">
                <TypeBadge type={entry.type} />
            </td>
            <td className="px-space-md py-2 font-data-mono text-label-md text-on-surface-variant whitespace-nowrap">
                {entry.reference}
            </td>
            <td
                className={`px-space-md py-2 text-right font-data-mono text-headline-sm font-semibold whitespace-nowrap ${amountColor[entry.type]}`}
            >
                {formatCurrency(entry.amount)}
            </td>
            <td className="px-space-md py-2 text-center whitespace-nowrap">
                <StatusBadge status={entry.status} />
            </td>
            <td className="pr-space-lg pl-space-md py-2 text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-1">
                    {!settled && (
                        <button
                            type="button"
                            title="Mark as Settled"
                            onClick={() => onSettle(entry._id)}
                            className="h-7 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[14px]">
                                check
                            </span>
                            Settle
                        </button>
                    )}
                    <button
                        type="button"
                        title="Delete Entry"
                        onClick={() => onDelete(entry._id)}
                        className="h-7 w-7 rounded-lg hover:bg-error-container text-on-surface-variant hover:text-on-error-container flex items-center justify-center transition-colors"
                    >
                        <span className="material-symbols-outlined text-[15px]">
                            delete
                        </span>
                    </button>
                </div>
            </td>
        </tr>
    );
}
