"use client";

import { useState } from "react";
import { todayISO } from "./format";
import type { EntryStatus, EntryType, NewFinanceEntry } from "./types";

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (entry: NewFinanceEntry) => void;
}

const TYPES: { value: EntryType; label: string }[] = [
    { value: "COD", label: "COD" },
    { value: "DEBIT", label: "Debit" },
    { value: "CREDIT", label: "Credit" },
];

const inputClass =
    "w-full h-9 pl-10 pr-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary";

function Field({
    label,
    required,
    icon,
    children,
}: {
    label: string;
    required?: boolean;
    icon: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface font-medium flex items-center justify-between">
                <span>{label}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {required ? "Required" : "Optional"}
                </span>
            </label>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                    {icon}
                </span>
                {children}
            </div>
        </div>
    );
}

/* Drawer খোলা থাকলেই mount হয়, তাই state প্রতিবার fresh শুরু হয় */
function EntryForm({
    onClose,
    onSave,
}: {
    onClose: () => void;
    onSave: (entry: NewFinanceEntry) => void;
}) {
    const [date, setDate] = useState(todayISO);
    const [partyName, setPartyName] = useState("");
    const [type, setType] = useState<EntryType>("COD");
    const [amount, setAmount] = useState("");
    const [reference, setReference] = useState("");
    const [status, setStatus] = useState<EntryStatus>("PENDING");

    const handleSave = () => {
        const parsed = parseFloat(amount);
        if (!partyName.trim() || !date || Number.isNaN(parsed) || parsed <= 0)
            return;

        onSave({
            date,
            partyName: partyName.trim(),
            type,
            amount: parsed,
            reference: reference.trim(),
            status,
        });
    };

    return (
        <>
            {/* Header */}
            <div className="h-16 px-space-lg bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                        Add Finance Entry
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Post record to General Logistics Ledger
                    </span>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        close
                    </span>
                </button>
            </div>

            {/* Form */}
            <div className="p-space-lg flex-1 overflow-y-auto flex flex-col gap-space-md">
                <Field label="Date" required icon="calendar_month">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={inputClass}
                    />
                </Field>

                <Field
                    label="Party Name (Customer or Vendor)"
                    required
                    icon="domain"
                >
                    <input
                        type="text"
                        value={partyName}
                        onChange={(e) => setPartyName(e.target.value)}
                        placeholder="e.g., SwiftCart Logistics"
                        className={inputClass}
                    />
                </Field>

                <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface font-medium">
                        Transaction Classification
                    </label>
                    <div className="grid grid-cols-3 gap-1 p-1 bg-surface-container-low rounded-lg">
                        {TYPES.map((t) => (
                            <button
                                key={t.value}
                                type="button"
                                onClick={() => setType(t.value)}
                                className={`py-1.5 rounded font-label-md text-label-md text-center transition-all ${
                                    type === t.value
                                        ? "bg-primary text-on-primary font-semibold shadow-sm"
                                        : "text-on-surface-variant hover:text-on-surface"
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                <Field label="Amount ($ USD)" required icon="attach_money">
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className={`${inputClass} font-data-mono font-medium`}
                    />
                </Field>

                <Field label="Reference / Invoice ID" icon="receipt">
                    <input
                        type="text"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        placeholder="e.g., ORD-9481-B or INV-8820"
                        className={inputClass}
                    />
                </Field>

                <div className="flex flex-col gap-1.5 pt-1">
                    <label className="font-label-md text-label-md text-on-surface font-medium">
                        Status
                    </label>
                    <div className="grid grid-cols-2 gap-space-sm">
                        {(["PENDING", "SETTLED"] as EntryStatus[]).map((s) => (
                            <label
                                key={s}
                                className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors"
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    checked={status === s}
                                    onChange={() => setStatus(s)}
                                    className="h-4 w-4"
                                />
                                <span className="font-label-md text-label-md text-on-surface font-medium capitalize">
                                    {s.toLowerCase()}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-space-lg bg-surface-container-low flex items-center gap-space-md">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 h-9 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 h-9 px-space-md rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-inverse-surface active:scale-[0.98] transition-all font-semibold flex items-center justify-center gap-1.5"
                >
                    <span className="material-symbols-outlined text-[16px]">
                        save
                    </span>
                    Save Entry
                </button>
            </div>
        </>
    );
}

export default function AddEntryDrawer({ open, onClose, onSave }: Props) {
    return (
        <>
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            />
            <div
                className={`fixed right-0 top-0 bottom-0 w-full max-w-lg bg-surface-container-lowest shadow-2xl z-50 transition-transform duration-300 ease-out flex flex-col justify-between overflow-hidden ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {open && <EntryForm onClose={onClose} onSave={onSave} />}
            </div>
        </>
    );
}
