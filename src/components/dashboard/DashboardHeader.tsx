import React from "react";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md py-space-lg mb-space-md">
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-space-sm mb-1">
          <h1 className="text-headline-lg text-on-surface tracking-tight font-semibold">
            Logistics Operations Dashboard
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary text-label-sm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            PRD §4.1 EXEC-SYNC
          </span>
        </div>
        <div className="flex items-center gap-space-sm text-label-md text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-outline">history</span>
            Live Sync · Auto-refreshed 2m ago
          </span>
          <span>•</span>
          <span className="font-mono text-label-sm text-outline">SHARD-03_ORD_FLEET_REPLICA</span>
        </div>
      </div>

      {/* Filter Control & Date Context */}
      <div className="flex items-center gap-space-sm shrink-0">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          <span className="material-symbols-outlined text-outline text-[18px]">hub</span>
          <span className="text-label-md text-on-surface font-medium">All Hubs & Branches</span>
          <span className="material-symbols-outlined text-outline text-[16px]">expand_more</span>
        </div>
        <button
          className="px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm hover:bg-surface-container text-on-surface flex items-center gap-1.5 transition-colors text-label-md font-medium border border-outline-variant/30"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px] text-outline">tune</span>
          <span>Filter Scope</span>
        </button>
        <button
          className="px-3 py-1.5 rounded-lg bg-primary text-on-primary shadow-sm hover:bg-primary-container flex items-center gap-1.5 transition-colors text-label-md font-medium"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">file_download</span>
          <span>Export Metrics</span>
        </button>
      </div>
    </div>
  );
}
