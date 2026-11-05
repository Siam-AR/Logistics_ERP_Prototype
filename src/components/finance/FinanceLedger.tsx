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
} from "@/lib/types";

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

    const handleAdd = async (data: NewFinanceEntry) => {
        try {
            const res = await fetch("/api/finance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const created: FinanceEntry = await res.json();
                setEntries((prev) => [created, ...prev]);
                setDrawerOpen(false);
            } else {
                const errData = await res.json().catch(() => ({}));
                alert(errData.error || "Failed to create finance entry");
            }
        } catch (err) {
            console.error("Failed to add entry:", err);
            alert("Network error while creating entry");
        }
    };

    const handleSettle = async (id: string) => {
        setEntries((prev) =>
            prev.map((e) => (e._id === id ? { ...e, status: "SETTLED" } : e)),
        );
        try {
            const res = await fetch(`/api/finance/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "SETTLED" }),
            });
            if (!res.ok) {
                setEntries((prev) =>
                    prev.map((e) => (e._id === id ? { ...e, status: "PENDING" } : e)),
                );
            }
        } catch (err) {
            console.error("Failed to settle entry:", err);
            setEntries((prev) =>
                prev.map((e) => (e._id === id ? { ...e, status: "PENDING" } : e)),
            );
        }
    };

    const handleDelete = async (id: string) => {
        const previous = entries;
        setEntries((prev) => prev.filter((e) => e._id !== id));
        try {
            const res = await fetch(`/api/finance/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                setEntries(previous);
            }
        } catch (err) {
            console.error("Failed to delete entry:", err);
            setEntries(previous);
        }
    };

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
