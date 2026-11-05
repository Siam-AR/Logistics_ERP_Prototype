import React from "react";
import Link from "next/link";

interface InventoryHealthSectionProps {
  totalSkus?: number;
  newSkusCount?: number;
  totalVolume?: number;
  aislesCount?: number;
  criticalLowStockCount?: number;
  warehouseCapacityUtilized?: string;
}

export default function InventoryHealthSection({
  totalSkus = 142,
  newSkusCount = 3,
  totalVolume = 48920,
  aislesCount = 6,
  criticalLowStockCount = 6,
  warehouseCapacityUtilized = "78.4%",
}: InventoryHealthSectionProps) {
  return (
    <div className="flex flex-col gap-space-sm mb-space-xl">
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            inventory_2
          </span>
          <h2 className="text-headline-sm font-semibold text-on-surface">
            Section 3 · Inventory Health
          </h2>
          <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface-variant">
            CENTRAL_WAREHOUSE
          </span>
        </div>
        <span className="text-label-md text-outline font-mono">
          Capacity: {warehouseCapacityUtilized} utilized
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
        {/* Total SKUs */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-outline-variant/30">
          <div>
            <span className="text-label-md text-on-surface-variant uppercase font-medium block mb-1">
              Total SKUs / Items
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-headline-xl font-mono font-semibold text-on-surface">
                {totalSkus}
              </span>
              <span className="text-body-sm text-on-surface-variant">Active catalog items</span>
            </div>
            <span className="text-label-sm text-secondary font-mono mt-2 block font-medium">
              +{newSkusCount} registered this cycle
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[24px]">category</span>
          </div>
        </div>

        {/* Total Stock Volume */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-outline-variant/30">
          <div>
            <span className="text-label-md text-on-surface-variant uppercase font-medium block mb-1">
              Total Stock Volume
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-headline-xl font-mono font-semibold text-on-surface">
                {totalVolume.toLocaleString("en-US")}
              </span>
              <span className="text-body-sm text-on-surface-variant">Units on hand</span>
            </div>
            <span className="text-label-sm text-emerald-700 font-mono mt-2 block font-medium">
              Spread across {aislesCount} Aisles
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[24px]">pallet</span>
          </div>
        </div>

        {/* Low-Stock Alerts */}
        <div className="p-5 rounded-xl bg-rose-50/70 shadow-sm flex items-center justify-between border border-rose-200/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-label-md text-rose-900 uppercase font-semibold">
                Low-Stock Alerts
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-200/70 text-rose-900 text-label-sm uppercase font-bold animate-pulse">
                Critical
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-headline-xl font-mono font-semibold text-rose-800">
                {criticalLowStockCount}
              </span>
              <span className="text-body-sm text-rose-900 font-medium">
                Critical items below safety floor
              </span>
            </div>
            <Link
              href="/inventory"
              className="text-label-sm text-rose-800 font-semibold mt-2 block hover:underline"
            >
              Reorder recommended immediately
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
            <span className="material-symbols-outlined text-[26px]">warning</span>
          </div>
        </div>
      </div>
    </div>
  );
}

