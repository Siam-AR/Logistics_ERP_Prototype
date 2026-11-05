import React from "react";
import Link from "next/link";

interface SettlementItem {
  id: string;
  partyName: string;
  receiptCode: string;
  agentName: string;
  hubName: string;
  amount: number;
  status: "Settled" | "Pending";
}

interface MonitorItem {
  id: string;
  tag: string;
  type: "fleet" | "inventory-critical" | "inventory-warning";
  identifier: string;
  subtitle: string;
  condition: string;
  metric: string;
}

interface CrossModuleActivitySectionProps {
  settlements?: SettlementItem[];
  monitors?: MonitorItem[];
}

const DEFAULT_SETTLEMENTS: SettlementItem[] = [
  {
    id: "1",
    partyName: "Apex Distribution Ltd",
    receiptCode: "REC-8841-COD",
    agentName: "Marcus Vance",
    hubName: "North Hub Depot",
    amount: 4280.0,
    status: "Settled",
  },
  {
    id: "2",
    partyName: "Solano Retail Partners",
    receiptCode: "REC-8840-COD",
    agentName: "Devon Ray",
    hubName: "West Hub Dispatch",
    amount: 2150.0,
    status: "Settled",
  },
  {
    id: "3",
    partyName: "Metro Hypermarket Co.",
    receiptCode: "REC-8839-COD",
    agentName: "Tariq Hamilton",
    hubName: "North Hub Depot",
    amount: 6890.0,
    status: "Settled",
  },
  {
    id: "4",
    partyName: "Evergreen Pharma Supply",
    receiptCode: "REC-8838-COD",
    agentName: "Elena Ramos",
    hubName: "South Satellite",
    amount: 1600.0,
    status: "Settled",
  },
];

const DEFAULT_MONITORS: MonitorItem[] = [
  {
    id: "1",
    tag: "FLEET-12",
    type: "fleet",
    identifier: "Volvo FH16 · Driver D. Cruz",
    subtitle: "Route: North Hub → Port Terminal",
    condition: "Rolling Out (42 km/h)",
    metric: "ETA 14:30",
  },
  {
    id: "2",
    tag: "SKU-7721",
    type: "inventory-critical",
    identifier: "Thermal Wrap Roll (Heavy)",
    subtitle: "Aisle 3 · Bin B-14",
    condition: "Stockout Risk",
    metric: "8 / 150 min",
  },
  {
    id: "3",
    tag: "FLEET-07",
    type: "fleet",
    identifier: "Isuzu NPR · Driver K. Thorne",
    subtitle: "Route: West Hub → Downtown Zone",
    condition: "Dispatched (Departed)",
    metric: "ETA 11:15",
  },
  {
    id: "4",
    tag: "SKU-9042",
    type: "inventory-warning",
    identifier: "Industrial Sealant Type-B",
    subtitle: "Aisle 1 · Hazardous Bay 4",
    condition: "Reorder Threshold",
    metric: "14 / 80 min",
  },
];

export default function CrossModuleActivitySection({
  settlements = DEFAULT_SETTLEMENTS,
  monitors = DEFAULT_MONITORS,
}: CrossModuleActivitySectionProps) {
  const totalSettled = settlements.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="flex flex-col gap-space-sm">
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            sync_alt
          </span>
          <h2 className="text-headline-sm font-semibold text-on-surface">
            Section 4 · Recent Cross-Module Activity Feed
          </h2>
          <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface-variant">
            CROSS_NODE_STREAM
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-label-sm text-outline">Realtime ingestion</span>
        </div>
      </div>

      {/* Dual Surface Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-gutter-desktop items-start">
        {/* Left: Latest 4 COD Settlements */}
        <div className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col border border-outline-variant/30">
          <div className="px-5 py-3.5 bg-surface-container-low/70 flex items-center justify-between border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">
                payments
              </span>
              <span className="text-label-lg font-semibold text-on-surface">
                Latest 4 COD Settlements
              </span>
            </div>
            <span className="font-mono text-label-sm text-on-surface-variant">
              TOTAL: ${totalSettled.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-4">Receipt / Party</th>
                  <th className="py-2.5 px-4">Agent / Hub</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low text-body-sm">
                {settlements.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-on-surface">{item.partyName}</div>
                      <div className="font-mono text-label-sm text-outline">{item.receiptCode}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-on-surface">{item.agentName}</div>
                      <div className="text-label-sm text-outline">{item.hubName}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium text-on-surface">
                      ${item.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-label-sm uppercase font-semibold bg-emerald-100/70 text-emerald-800">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-surface-container-low/30 text-center border-t border-outline-variant/20">
            <Link
              className="text-label-sm text-secondary hover:underline font-medium"
              href="/finance"
            >
              View Complete Settlements Ledger (86 Records) →
            </Link>
          </div>
        </div>

        {/* Right: Quick Dispatch & Critical Stock Table */}
        <div className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col border border-outline-variant/30">
          <div className="px-5 py-3.5 bg-surface-container-low/70 flex items-center justify-between border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">
                alt_route
              </span>
              <span className="text-label-lg font-semibold text-on-surface">
                Dispatches & Critical Stock Monitor
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-label-sm uppercase font-semibold">
              2 Flags Alert
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-4">Unit / SKU</th>
                  <th className="py-2.5 px-4">Identifier / Name</th>
                  <th className="py-2.5 px-4">Condition / State</th>
                  <th className="py-2.5 px-4 text-right">Metrics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low text-body-sm">
                {monitors.map((item) => {
                  const isStockout = item.type === "inventory-critical";
                  const isWarning = item.type === "inventory-warning";

                  let rowBg = "hover:bg-surface-container-low/40";
                  let tagBadgeClass = "bg-blue-100 text-blue-900";
                  let tagIcon = "local_shipping";
                  let nameClass = "text-on-surface";
                  let subClass = "text-outline";
                  let conditionBadge = (
                    <span className="inline-flex items-center gap-1 text-blue-900 text-label-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                      {item.condition}
                    </span>
                  );
                  let metricClass = "text-on-surface-variant";

                  if (isStockout) {
                    rowBg = "bg-rose-50/20 hover:bg-rose-50/40";
                    tagBadgeClass = "bg-rose-100 text-rose-900 font-bold";
                    tagIcon = "warning";
                    nameClass = "text-rose-950 font-medium";
                    subClass = "text-rose-800";
                    conditionBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-label-sm uppercase bg-rose-100 text-rose-800 font-semibold">
                        {item.condition}
                      </span>
                    );
                    metricClass = "font-bold text-rose-700";
                  } else if (isWarning) {
                    rowBg = "bg-amber-50/20 hover:bg-amber-50/40";
                    tagBadgeClass = "bg-amber-100 text-amber-900 font-bold";
                    tagIcon = "error";
                    nameClass = "text-amber-950 font-medium";
                    subClass = "text-amber-800";
                    conditionBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-label-sm uppercase bg-amber-100 text-amber-900 font-semibold">
                        {item.condition}
                      </span>
                    );
                    metricClass = "font-bold text-amber-800";
                  }

                  return (
                    <tr key={item.id} className={`${rowBg} transition-colors`}>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-label-sm px-2 py-0.5 rounded ${tagBadgeClass}`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {tagIcon}
                          </span>
                          {item.tag}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`font-medium ${nameClass}`}>{item.identifier}</div>
                        <div className={`text-label-sm ${subClass}`}>{item.subtitle}</div>
                      </td>
                      <td className="py-3 px-4">{conditionBadge}</td>
                      <td className={`py-3 px-4 text-right font-mono text-label-sm ${metricClass}`}>
                        {item.metric}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-surface-container-low/30 flex items-center justify-between text-label-sm border-t border-outline-variant/20">
            <span className="text-outline">Showing live operational triggers</span>
            <Link
              className="text-secondary hover:underline font-medium"
              href="/inventory"
            >
              View Dispatch Board & Stock Alarms →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
