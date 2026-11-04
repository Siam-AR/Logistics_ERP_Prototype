export type EntryType = "COD" | "DEBIT" | "CREDIT";
export type EntryStatus = "PENDING" | "SETTLED";

export interface FinanceEntry {
    _id: string;
    date: string; // ISO: "2024-10-24"
    partyName: string;
    partyNote?: string;
    type: EntryType;
    reference: string;
    amount: number;
    status: EntryStatus;
}

export type NewFinanceEntry = Omit<FinanceEntry, "_id">;

export interface FinanceFilters {
    search: string;
    type: EntryType | "ALL";
    status: EntryStatus | "ALL";
}

export const DEFAULT_FILTERS: FinanceFilters = {
    search: "",
    type: "ALL",
    status: "ALL",
};
