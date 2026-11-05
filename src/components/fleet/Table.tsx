import type { ReactNode } from "react";

export interface Column<T> {
    header: string;
    cell: (row: T) => ReactNode;
    className?: string;
}

// Simple reusable table, shared by all three modules.
export default function Table<T extends { _id: string }>({
    columns,
    rows,
    empty = "No records yet.",
}: {
    columns: Column<T>[];
    rows: T[];
    empty?: string;
}) {
    return (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                        {columns.map((c) => (
                            <th
                                key={c.header}
                                className={`px-4 py-3 font-medium ${c.className ?? ""}`}
                            >
                                {c.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {rows.map((r) => (
                        <tr key={r._id} className="hover:bg-slate-50">
                            {columns.map((c) => (
                                <td
                                    key={c.header}
                                    className={`px-4 py-3 ${c.className ?? ""}`}
                                >
                                    {c.cell(r)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {rows.length === 0 && (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-4 py-10 text-center text-slate-400"
                            >
                                {empty}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
