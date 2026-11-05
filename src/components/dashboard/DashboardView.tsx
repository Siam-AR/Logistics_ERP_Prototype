import React from "react";
import DashboardHeader from "./DashboardHeader";
import FinanceOverviewSection from "./FinanceOverviewSection";
import FleetOverviewSection from "./FleetOverviewSection";
import InventoryHealthSection from "./InventoryHealthSection";
import CrossModuleActivitySection from "./CrossModuleActivitySection";
import DashboardFooter from "./DashboardFooter";
import type { DashboardMetrics } from "@/lib/types";

interface DashboardViewProps {
  metrics: DashboardMetrics;
}

export default function DashboardView({ metrics }: DashboardViewProps) {
  return (
    <div className="flex flex-col w-full pb-12">
      {/* Top Operational Banner & System Sync */}
      <DashboardHeader metrics={metrics} />

      {/* SECTION 1: Finance Overview */}
      <FinanceOverviewSection
        codPending={metrics.finance.codPending}
        receivables={metrics.finance.receivables}
        payables={metrics.finance.payables}
      />

      {/* SECTION 2: Fleet Status Overview */}
      <FleetOverviewSection
        totalFleet={metrics.fleet.totalFleet}
        available={metrics.fleet.available}
        onTrip={metrics.fleet.onTrip}
        inMaintenance={metrics.fleet.inMaintenance}
        gpsPing={metrics.fleet.gpsPing}
      />

      {/* SECTION 3: Inventory Health */}
      <InventoryHealthSection
        totalSkus={metrics.inventory.totalSkus}
        newSkusCount={metrics.inventory.newSkusCount}
        totalVolume={metrics.inventory.totalVolume}
        aislesCount={metrics.inventory.aislesCount}
        criticalLowStockCount={metrics.inventory.criticalLowStockCount}
        warehouseCapacityUtilized={metrics.inventory.warehouseCapacityUtilized}
      />

      {/* SECTION 4: Recent Cross-Module Activity Feed */}
      <CrossModuleActivitySection
        settlements={metrics.activity.settlements}
        monitors={metrics.activity.monitors}
      />

      {/* Operational Footer Metrics Bar */}
      <DashboardFooter />
    </div>
  );
}
