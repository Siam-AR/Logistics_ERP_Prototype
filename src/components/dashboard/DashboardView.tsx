import React from "react";
import DashboardHeader from "./DashboardHeader";
import FinanceOverviewSection from "./FinanceOverviewSection";
import FleetOverviewSection from "./FleetOverviewSection";
import InventoryHealthSection from "./InventoryHealthSection";
import CrossModuleActivitySection from "./CrossModuleActivitySection";
import DashboardFooter from "./DashboardFooter";

export default function DashboardView() {
  return (
    <div className="flex flex-col w-full pb-12">
      {/* Top Operational Banner & System Sync */}
      <DashboardHeader />

      {/* SECTION 1: Finance Overview */}
      <FinanceOverviewSection />

      {/* SECTION 2: Fleet Status Overview */}
      <FleetOverviewSection />

      {/* SECTION 3: Inventory Health */}
      <InventoryHealthSection />

      {/* SECTION 4: Recent Cross-Module Activity Feed */}
      <CrossModuleActivitySection />

      {/* Operational Footer Metrics Bar */}
      <DashboardFooter />
    </div>
  );
}
