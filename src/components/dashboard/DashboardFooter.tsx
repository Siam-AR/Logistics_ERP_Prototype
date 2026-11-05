import React from "react";

export default function DashboardFooter() {
  return (
    <div className="mt-space-xl p-4 rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-md border border-outline-variant/30">
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
          <span className="text-label-md text-on-surface font-semibold">
            PRD 4.1 Executive System Integration
          </span>
        </div>
        <span className="hidden md:inline text-outline">|</span>
        <span className="text-body-sm text-on-surface-variant">
          Cross-sync validation active: Finance (Collections), Fleet (Telematics), Inventory (WMS)
        </span>
      </div>
      <div className="flex items-center gap-space-sm font-mono text-label-sm text-outline">
        <span>LATENCY: 14ms</span>
        <span>•</span>
        <span>ERROR RATE: 0.00%</span>
        <span>•</span>
        <span className="text-emerald-700 font-medium">STATUS: NOMINAL</span>
      </div>
    </div>
  );
}
