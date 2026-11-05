"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { DashboardMetrics } from "@/lib/types";

interface DashboardHeaderProps {
  metrics?: DashboardMetrics;
}

export default function DashboardHeader({ metrics }: DashboardHeaderProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedHub, setSelectedHub] = useState("All Hubs & Branches");
  const [hubDropdownOpen, setHubDropdownOpen] = useState(false);

  const hubs = ["All Hubs & Branches", "North Hub Depot", "West Hub Dispatch", "South Satellite"];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleExport = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      hubScope: selectedHub,
      metrics: metrics || {},
      status: "NOMINAL",
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logistics-operations-metrics-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 hover:text-on-surface transition-colors cursor-pointer"
            title="Click to refresh live data"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[15px] text-outline ${
                isRefreshing ? "animate-spin text-secondary" : ""
              }`}
            >
              refresh
            </span>
            <span>Live Sync · {isRefreshing ? "Refreshing..." : "Auto-synced with MongoDB"}</span>
          </button>
          <span>•</span>
          <span className="font-mono text-label-sm text-outline">SHARD-03_ORD_FLEET_REPLICA</span>
        </div>
      </div>

      {/* Filter Control & Date Context */}
      <div className="flex items-center gap-space-sm shrink-0 relative">
        <div className="relative">
          <button
            onClick={() => setHubDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm border border-outline-variant/30 text-label-md text-on-surface font-medium hover:bg-surface-container-low transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-outline text-[18px]">hub</span>
            <span>{selectedHub}</span>
            <span className="material-symbols-outlined text-outline text-[16px]">expand_more</span>
          </button>

          {hubDropdownOpen && (
            <div className="absolute left-0 mt-1 w-48 rounded-lg bg-surface-container-lowest shadow-lg border border-outline-variant/30 py-1 z-30">
              {hubs.map((hub) => (
                <button
                  key={hub}
                  onClick={() => {
                    setSelectedHub(hub);
                    setHubDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-body-sm hover:bg-surface-container transition-colors ${
                    selectedHub === hub ? "text-secondary font-medium bg-surface-container-low" : "text-on-surface"
                  }`}
                  type="button"
                >
                  {hub}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleRefresh}
          className="px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm hover:bg-surface-container text-on-surface flex items-center gap-1.5 transition-colors text-label-md font-medium border border-outline-variant/30"
          type="button"
          title="Sync latest records"
        >
          <span className="material-symbols-outlined text-[16px] text-outline">tune</span>
          <span>Sync Scope</span>
        </button>

        <button
          onClick={handleExport}
          className="px-3 py-1.5 rounded-lg bg-primary text-on-primary shadow-sm hover:bg-primary-container flex items-center gap-1.5 transition-colors text-label-md font-medium"
          type="button"
          title="Export operational summary JSON"
        >
          <span className="material-symbols-outlined text-[16px]">file_download</span>
          <span>Export Metrics</span>
        </button>
      </div>
    </div>
  );
}
