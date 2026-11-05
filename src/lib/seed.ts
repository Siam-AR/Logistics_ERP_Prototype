import type { Db } from "mongodb";
import type { NewFinanceEntry, NewVehicle } from "./types";

const sampleItems = [
    {
        name: "Industrial Pallet Shrink Film 500mm",
        sku: "SKU-LOG-901",
        quantity: 45,
        unit: "roll",
        lowStockLevel: 50,
    },
    {
        name: "Corrugated Shipping Boxes (L)",
        sku: "SKU-LOG-114",
        quantity: 1420,
        unit: "pcs",
        lowStockLevel: 200,
    },
    {
        name: "Heavy-Duty Strapping Tape 50mm",
        sku: "SKU-LOG-883",
        quantity: 180,
        unit: "roll",
        lowStockLevel: 200,
    },
    {
        name: "Poly Bubble Mailers #4",
        sku: "SKU-LOG-205",
        quantity: 8500,
        unit: "pcs",
        lowStockLevel: 1000,
    },
    {
        name: "Wooden Euro Pallets Grade-A",
        sku: "SKU-LOG-044",
        quantity: 24,
        unit: "pallet",
        lowStockLevel: 50,
    },
    {
        name: "RFID Barcode Tracking Labels",
        sku: "SKU-LOG-512",
        quantity: 38751,
        unit: "pcs",
        lowStockLevel: 5000,
    },
    {
        name: "Packing Foam Sheets",
        sku: "SKU-LOG-320",
        quantity: 640,
        unit: "box",
        lowStockLevel: 100,
    },
    {
        name: "Industrial Cleaning Solvent",
        sku: "SKU-LOG-777",
        quantity: 90,
        unit: "kg",
        lowStockLevel: 120,
    },
];

const sampleFinanceEntries: NewFinanceEntry[] = [
    {
        date: "2024-10-24",
        partyName: "Apex Global Retail",
        partyNote: "Dispatcher: Route #401B",
        type: "COD",
        reference: "ORD-8921-X",
        amount: 14250,
        status: "PENDING",
    },
    {
        date: "2024-10-23",
        partyName: "Metro Freight Hub",
        partyNote: "Net 15 Master Billed",
        type: "DEBIT",
        reference: "INV-4029-C",
        amount: 36800,
        status: "SETTLED",
    },
    {
        date: "2024-10-22",
        partyName: "Nordic Parts Ltd",
        partyNote: "OEM Braking Kits & Hydraulic",
        type: "CREDIT",
        reference: "FUEL-DEPOT-12",
        amount: 18400,
        status: "PENDING",
    },
    {
        date: "2024-10-21",
        partyName: "SwiftCart Logistics",
        partyNote: "Last Mile Hub Dispatch",
        type: "COD",
        reference: "ORD-9014-F",
        amount: 19700,
        status: "PENDING",
    },
    {
        date: "2024-10-20",
        partyName: "Zenith Electronics",
        partyNote: "Contract Cargo Express",
        type: "DEBIT",
        reference: "INV-3882-K",
        amount: 49600,
        status: "SETTLED",
    },
    {
        date: "2024-10-19",
        partyName: "Starlight Warehousing",
        partyNote: "Cold-Chain Storage Bays 1-4",
        type: "CREDIT",
        reference: "BAY-LEASE-99",
        amount: 12850,
        status: "SETTLED",
    },
    {
        date: "2024-10-18",
        partyName: "Apex Global Retail",
        partyNote: "Pallet Dropoff North Dock",
        type: "COD",
        reference: "ORD-8710-P",
        amount: 8900,
        status: "SETTLED",
    },
];

const sampleVehicles: NewVehicle[] = [
    {
        plate: "TRK-9021-TX",
        vehicleType: "Heavy Duty Semi-Truck (40t)",
        driver: "Marcus Vance",
        status: "On Trip",
        notes: "Scheduled return 18:00",
    },
    {
        plate: "VAN-4482-CA",
        vehicleType: "Sprinter Cargo Van (3.5t)",
        driver: "David Chen",
        status: "Available",
        notes: "Clean inspection pass",
    },
    {
        plate: "TRK-1092-NY",
        vehicleType: "Refrigerated Box Truck (18t)",
        driver: "Elena Rostova",
        status: "In Maintenance",
        notes: "Brake pad inspection scheduled",
    },
    {
        plate: "SPR-8812-FL",
        vehicleType: "Sprinter Cargo Van (3.5t)",
        driver: "Jamal Washington",
        status: "Available",
        notes: "Clean inspection pass",
    },
    {
        plate: "TRK-7741-IL",
        vehicleType: "Flatbed Hauler (24t)",
        driver: "Sarah Miller",
        status: "On Trip",
        notes: "Route TX-88 on time",
    },
    {
        plate: "TRK-3350-GA",
        vehicleType: "Flatbed Hauler (24t)",
        driver: "Omar Haddad",
        status: "Available",
        notes: "",
    },
    {
        plate: "VAN-6107-WA",
        vehicleType: "Standard Cargo Van (2.8t)",
        driver: "Lena Fischer",
        status: "On Trip",
        notes: "Last-mile route 12",
    },
];

const isSeeded = {
    inventory: false,
    finance: false,
    fleet: false,
};

// Preloads sample data the first time the collection is empty and sets up performance indexes.
export async function seedIfEmpty(db: Db) {
    if (isSeeded.inventory) return;
    const col = db.collection("inventory");
    if ((await col.estimatedDocumentCount()) === 0) {
        await col.insertMany(sampleItems.map((i) => ({ ...i })));
        await col.createIndex({ name: 1 }).catch(() => {});
        await col.createIndex({ sku: 1 }).catch(() => {});
    }
    isSeeded.inventory = true;
}

export async function seedFinanceIfEmpty(db: Db) {
    if (isSeeded.finance) return;
    const col = db.collection("finance");
    if ((await col.estimatedDocumentCount()) === 0) {
        await col.insertMany(sampleFinanceEntries.map((e) => ({ ...e })));
        await col.createIndex({ date: -1 }).catch(() => {});
        await col.createIndex({ type: 1, status: 1 }).catch(() => {});
    }
    isSeeded.finance = true;
}

export async function seedFleetIfEmpty(db: Db) {
    if (isSeeded.fleet) return;
    const col = db.collection("vehicles");
    if ((await col.estimatedDocumentCount()) === 0) {
        await col.insertMany(sampleVehicles.map((v) => ({ ...v })));
        await col.createIndex({ status: 1 }).catch(() => {});
    }
    isSeeded.fleet = true;
}

export async function seedAllIfEmpty(db: Db) {
    if (isSeeded.inventory && isSeeded.finance && isSeeded.fleet) return;
    await Promise.all([
        seedIfEmpty(db),
        seedFinanceIfEmpty(db),
        seedFleetIfEmpty(db),
    ]);
}

