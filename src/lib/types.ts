export type InventoryItem = {
    _id: string;
    name: string;
    sku: string;
    quantity: number;
    unit: string;
    lowStockLevel: number;
};

export type EntryType = "COD" | "DEBIT" | "CREDIT";
export type EntryStatus = "PENDING" | "SETTLED";

export interface FinanceEntry {
    _id: string;
    date: string; // ISO: "YYYY-MM-DD"
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

// ---------- Fleet ----------
export const VEHICLE_STATUSES = [
    "Available",
    "On Trip",
    "In Maintenance",
] as const;
export type VehicleStatus = (typeof VEHICLE_STATUSES)[number];

export interface Vehicle {
    _id: string;
    plate: string;
    vehicleType: string;
    driver: string;
    status: VehicleStatus;
    notes?: string;
}

export type NewVehicle = Omit<Vehicle, "_id">;
export type VehicleFilter = VehicleStatus | "ALL";
