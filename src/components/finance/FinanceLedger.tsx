"use client";

import { useMemo, useState } from "react";
import AddEntryDrawer from "./AddEntryDrawer";
import FinanceFilters from "./FinanceFilters";
import FinanceHeader from "./FinanceHeader";
import FinanceKpiCards from "./FinanceKpiCards";
import FinanceTable from "./FinanceTable";
import {
    DEFAULT_FILTERS,
    type FinanceEntry,
    type NewFinanceEntry,
} from "./types";

export default function FinanceLedger({
    initialEntries,
}: {
    initialEntries: FinanceEntry[];
}) {
    const [entries, setEntries] = useState<FinanceEntry[]>(initialEntries);
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const visibleEntries = useMemo(() => {
        const term = filters.search.toLowerCase().trim();
        return entries.filter((e) => {
            const matchesSearch =
                !term ||
                e.partyName.toLowerCase().includes(term) ||
                e.reference.toLowerCase().includes(term) ||
                (e.partyNote ?? "").toLowerCase().includes(term);
            const matchesType =
                filters.type === "ALL" || e.type === filters.type;
            const matchesStatus =
                filters.status === "ALL" || e.status === filters.status;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [entries, filters]);

    // TODO: replace these three handlers with API calls (MongoDB) once backend is ready.
    const handleAdd = (data: NewFinanceEntry) => {
        const entry: FinanceEntry = {
            ...data,
            _id: crypto.randomUUID(),
            reference:
                data.reference ||
                `MANUAL-${Math.floor(1000 + Math.random() * 9000)}`,
        };
        setEntries((prev) => [entry, ...prev]);
        setDrawerOpen(false);
    };

    const handleSettle = (id: string) =>
        setEntries((prev) =>
            prev.map((e) => (e._id === id ? { ...e, status: "SETTLED" } : e)),
        );

    const handleDelete = (id: string) =>
        setEntries((prev) => prev.filter((e) => e._id !== id));

    return (
        <div className="flex flex-col w-full pb-space-xl">
            <FinanceHeader />
            <FinanceKpiCards entries={entries} />
            <FinanceFilters
                filters={filters}
                onChange={setFilters}
                onAddClick={() => setDrawerOpen(true)}
            />
            <FinanceTable
                entries={visibleEntries}
                totalCount={entries.length}
                onSettle={handleSettle}
                onDelete={handleDelete}
            />
            <AddEntryDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onSave={handleAdd}
            />
        </div>
    );
}
