import FinanceTableRow from "./FinanceTableRow";
import type { FinanceEntry } from "@/lib/types";

interface Props {
    entries: FinanceEntry[];
    totalCount: number;
    onSettle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function FinanceTable({
    entries,
    totalCount,
    onSettle,
    onDelete,
}: Props) {
    return (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden my-space-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="h-10 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                            <th className="pl-space-lg pr-space-md py-2 w-32">
                                Date
                            </th>
                            <th className="px-space-md py-2">Party Name</th>
                            <th className="px-space-md py-2 text-center w-28">
                                Type
                            </th>
                            <th className="px-space-md py-2 w-40">Reference</th>
                            <th className="px-space-md py-2 text-right w-36">
                                Amount
                            </th>
                            <th className="px-space-md py-2 text-center w-36">
                                Status
                            </th>
                            <th className="pr-space-lg pl-space-md py-2 text-right w-44">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="font-body-md text-body-md text-on-surface">
                        {entries.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-space-xl text-center font-body-sm text-body-sm text-on-surface-variant"
                                >
                                    No entries found.
                                </td>
                            </tr>
                        ) : (
                            entries.map((entry) => (
                                <FinanceTableRow
                                    key={entry._id}
                                    entry={entry}
                                    onSettle={onSettle}
                                    onDelete={onDelete}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="px-space-lg py-space-md font-label-md text-label-md text-on-surface-variant">
                Showing{" "}
                <span className="font-semibold text-on-surface">
                    {entries.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-on-surface">
                    {totalCount}
                </span>{" "}
                entries
            </div>
        </div>
    );
}
