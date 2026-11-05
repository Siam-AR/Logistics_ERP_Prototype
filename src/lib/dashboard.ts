import { getDb } from "./db";
import { seedAllIfEmpty } from "./seed";
import type { DashboardMetrics, SettlementItem, MonitorItem } from "./types";

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const db = await getDb();

  // Ensure collections have sample data if empty (memoized in-memory)
  await seedAllIfEmpty(db);

  // Run all 3 collection queries in parallel with lean projections and database-level sorting
  const [financeDocs, vehicleDocs, inventoryDocs] = await Promise.all([
    db
      .collection("finance")
      .find(
        {},
        {
          projection: {
            type: 1,
            status: 1,
            amount: 1,
            partyName: 1,
            reference: 1,
            partyNote: 1,
            date: 1,
          },
        }
      )
      .sort({ date: -1 })
      .toArray(),
    db
      .collection("vehicles")
      .find(
        {},
        {
          projection: {
            status: 1,
            plate: 1,
            vehicleType: 1,
            driver: 1,
            notes: 1,
          },
        }
      )
      .toArray(),
    db
      .collection("inventory")
      .find(
        {},
        {
          projection: {
            quantity: 1,
            lowStockLevel: 1,
            sku: 1,
            name: 1,
          },
        }
      )
      .toArray(),
  ]);

  // 1. Finance Aggregations
  let codPendingAmount = 0;
  let codPendingCount = 0;
  let totalDebitAmount = 0;
  let debitOpenCount = 0;
  let totalDebitSettled = 0;
  let totalCreditAmount = 0;
  let creditOpenCount = 0;

  for (const doc of financeDocs) {
    const type = (doc.type || "").toUpperCase();
    const status = (doc.status || "").toUpperCase();
    const amt = Number(doc.amount) || 0;

    if (type === "COD") {
      if (status === "PENDING") {
        codPendingAmount += amt;
        codPendingCount++;
      }
    } else if (type === "DEBIT") {
      totalDebitAmount += amt;
      if (status === "PENDING") {
        debitOpenCount++;
      } else if (status === "SETTLED") {
        totalDebitSettled += amt;
      }
    } else if (type === "CREDIT") {
      totalCreditAmount += amt;
      if (status === "PENDING") {
        creditOpenCount++;
      }
    }
  }

  const debitRatio = totalDebitAmount > 0 ? (totalDebitSettled / totalDebitAmount) * 100 : 91.2;
  const healthPct = `${debitRatio.toFixed(1)}% healthy`;

  // 2. Fleet Aggregations
  const totalFleet = vehicleDocs.length;
  let available = 0;
  let onTrip = 0;
  let inMaintenance = 0;

  for (const v of vehicleDocs) {
    if (v.status === "Available") available++;
    else if (v.status === "On Trip") onTrip++;
    else if (v.status === "In Maintenance") inMaintenance++;
  }

  // 3. Inventory Aggregations
  const totalSkus = inventoryDocs.length;
  let totalVolume = 0;
  let criticalLowStockCount = 0;
  const criticalItems: Array<{ sku: string; name: string; quantity: number; lowStockLevel: number }> = [];

  for (const item of inventoryDocs) {
    const qty = Number(item.quantity) || 0;
    const low = Number(item.lowStockLevel) || 0;
    totalVolume += qty;
    if (qty <= low) {
      criticalLowStockCount++;
      criticalItems.push({
        sku: item.sku,
        name: item.name,
        quantity: qty,
        lowStockLevel: low,
      });
    }
  }

  // 4. Activity: Settlements (Latest 4, already sorted by date descending)
  const settlements: SettlementItem[] = financeDocs.slice(0, 4).map((f, i) => {
    const isSettled = (f.status || "").toUpperCase() === "SETTLED";
    const note = f.partyNote || "";
    let agentName = "Marcus Vance";
    let hubName = "North Hub Depot";

    if (note.toLowerCase().includes("dispatcher")) {
      agentName = "Marcus Vance";
      hubName = "North Hub Depot";
    } else if (note.toLowerCase().includes("dock")) {
      agentName = "Elena Ramos";
      hubName = "South Satellite";
    } else if (note.toLowerCase().includes("hub")) {
      agentName = "Devon Ray";
      hubName = "West Hub Dispatch";
    } else if (note.toLowerCase().includes("express") || note.toLowerCase().includes("cargo")) {
      agentName = "Tariq Hamilton";
      hubName = "North Hub Depot";
    }

    return {
      id: f._id.toString(),
      partyName: f.partyName || "Commercial Client",
      receiptCode: f.reference || `REC-884${i}-COD`,
      agentName,
      hubName,
      amount: Number(f.amount) || 0,
      status: isSettled ? "Settled" : "Pending",
    };
  });

  // 5. Activity: Monitors (Vehicles + Inventory)
  const monitors: MonitorItem[] = [];

  // Add up to 2 active vehicles
  const monitoredVehicles = vehicleDocs.slice(0, 2);
  monitoredVehicles.forEach((v) => {
    const isOnTrip = v.status === "On Trip";
    monitors.push({
      id: `v-${v._id.toString()}`,
      tag: v.plate,
      type: "fleet",
      identifier: `${v.vehicleType} · Driver ${v.driver}`,
      subtitle: v.notes ? `Note: ${v.notes}` : "Route: North Hub → Port Terminal",
      condition: isOnTrip ? "Rolling Out (42 km/h)" : "Available for Dispatch",
      metric: isOnTrip ? "ETA 14:30" : "Dock Standby",
    });
  });

  // Add critical items
  criticalItems.slice(0, 2).forEach((item) => {
    monitors.push({
      id: `inv-${item.sku}`,
      tag: item.sku,
      type: "inventory-critical",
      identifier: item.name,
      subtitle: "Central Warehouse Aisle",
      condition: "Stockout Risk",
      metric: `${item.quantity} / ${item.lowStockLevel} min`,
    });
  });

  // If we need more rows to make 4, take from inventory
  if (monitors.length < 4) {
    const remaining = inventoryDocs.filter((item) => !criticalItems.some((c) => c.sku === item.sku));
    remaining.slice(0, 4 - monitors.length).forEach((item) => {
      monitors.push({
        id: `inv-w-${item.sku}`,
        tag: item.sku,
        type: "inventory-warning",
        identifier: item.name,
        subtitle: "Aisle 1 · Standard Storage",
        condition: "Reorder Threshold",
        metric: `${item.quantity} / ${item.lowStockLevel} min`,
      });
    });
  }

  return {
    finance: {
      codPending: {
        amount: codPendingAmount,
        receiptsCount: codPendingCount,
        trendText: "+8.4% this week",
      },
      receivables: {
        amount: totalDebitAmount,
        openBalancesCount: debitOpenCount,
        agingAvg: "4.2d",
        healthPct,
      },
      payables: {
        amount: totalCreditAmount,
        invoicesDueCount: creditOpenCount,
        nextPayment: "Fuel logistics ($9.4k)",
        batchStatus: "Batch 04 Queued",
      },
    },
    fleet: {
      totalFleet,
      available,
      onTrip,
      inMaintenance,
      gpsPing: "42s ago",
    },
    inventory: {
      totalSkus,
      newSkusCount: 3,
      totalVolume,
      aislesCount: 6,
      criticalLowStockCount,
      warehouseCapacityUtilized: "78.4%",
    },
    activity: {
      settlements,
      monitors,
    },
  };
}
