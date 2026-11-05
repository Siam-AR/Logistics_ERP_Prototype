import React from "react";

interface FleetOverviewSectionProps {
  totalFleet?: number;
  available?: number;
  onTrip?: number;
  inMaintenance?: number;
  gpsPing?: string;
}

export default function FleetOverviewSection({
  totalFleet = 28,
  available = 14,
  onTrip = 10,
  inMaintenance = 4,
  gpsPing = "42s ago",
}: FleetOverviewSectionProps) {
  const availablePct = totalFleet > 0 ? Math.round((available / totalFleet) * 100) : 50;
  const onTripPct = totalFleet > 0 ? Math.round((onTrip / totalFleet) * 100) : 36;
  const inMaintenancePct = totalFleet > 0 ? 100 - availablePct - onTripPct : 14;

  return (
    <div className="flex flex-col gap-space-sm mb-space-xl">
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            local_shipping
          </span>
          <h2 className="text-headline-sm font-semibold text-on-surface">
            Section 2 · Fleet Status Overview
          </h2>
          <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface-variant">
            TELEMETRY_CONNECTED
          </span>
        </div>
        <span className="text-label-sm text-outline uppercase font-mono">
          GPS Ping: {gpsPing}
        </span>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
        {/* Total Fleet */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between text-outline mb-2">
            <span className="text-label-md text-on-surface-variant uppercase font-medium">
              Total Fleet
            </span>
            <span className="material-symbols-outlined text-[20px] text-on-surface">
              rv_hookup
            </span>
          </div>
          <div>
            <span className="text-headline-xl font-mono font-semibold text-on-surface">
              {totalFleet}
            </span>
            <span className="text-body-md text-on-surface-variant ml-1 font-medium">
              Commercial Vehicles
            </span>
          </div>
          <p className="text-body-sm text-outline mt-3">Active across North & West Hubs</p>
        </div>

        {/* Available */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md text-on-surface-variant uppercase font-medium">
              Available
            </span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          </div>
          <div>
            <span className="text-headline-xl font-mono font-semibold text-emerald-800">
              {available}
            </span>
            <span className="text-body-md text-on-surface-variant ml-1 font-medium">
              Vehicles ({availablePct}%)
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="material-symbols-outlined text-emerald-700 text-[16px]">
              check_circle
            </span>
            <span className="text-body-sm text-emerald-800 font-medium">Ready for dispatch</span>
          </div>
        </div>

        {/* On Trip */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md text-on-surface-variant uppercase font-medium">
              On Trip
            </span>
            <span className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]"></span>
          </div>
          <div>
            <span className="text-headline-xl font-mono font-semibold text-blue-900">
              {onTrip}
            </span>
            <span className="text-body-md text-on-surface-variant ml-1 font-medium">
              Vehicles ({onTripPct}%)
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="material-symbols-outlined text-blue-700 text-[16px]">
              navigation
            </span>
            <span className="text-body-sm text-blue-900 font-medium">In-transit right now</span>
          </div>
        </div>

        {/* In Maintenance */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md text-on-surface-variant uppercase font-medium">
              In Maintenance
            </span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          </div>
          <div>
            <span className="text-headline-xl font-mono font-semibold text-amber-900">
              {inMaintenance}
            </span>
            <span className="text-body-md text-on-surface-variant ml-1 font-medium">
              Vehicles ({inMaintenancePct}%)
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="material-symbols-outlined text-amber-700 text-[16px]">
              build_circle
            </span>
            <span className="text-body-sm text-amber-900 font-medium">
              Service bay · North Hub
            </span>
          </div>
        </div>
      </div>

      {/* Compact Visual Readiness Segmented Bar */}
      <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm mt-1 border border-outline-variant/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-label-sm text-on-surface-variant uppercase font-semibold">
            Fleet Readiness & Utilization Index
          </span>
          <div className="flex items-center gap-4 text-label-sm">
            <span className="flex items-center gap-1.5 text-on-surface font-medium">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> {availablePct}% Available
            </span>
            <span className="flex items-center gap-1.5 text-on-surface font-medium">
              <span className="w-2.5 h-2.5 rounded bg-blue-600"></span> {onTripPct}% On Trip
            </span>
            <span className="flex items-center gap-1.5 text-on-surface font-medium">
              <span className="w-2.5 h-2.5 rounded bg-amber-500"></span> {inMaintenancePct}% Maintenance
            </span>
          </div>
        </div>
        <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${availablePct}%` }}
            title={`${availablePct}% Available`}
          ></div>
          <div
            className="bg-blue-600 h-full transition-all duration-500"
            style={{ width: `${onTripPct}%` }}
            title={`${onTripPct}% On Trip`}
          ></div>
          <div
            className="bg-amber-500 h-full transition-all duration-500"
            style={{ width: `${inMaintenancePct}%` }}
            title={`${inMaintenancePct}% Maintenance`}
          ></div>
        </div>
      </div>
    </div>
  );
}
