import React from "react";
import Link from "next/link";

interface FinanceOverviewSectionProps {
  codPending?: {
    amount: number;
    receiptsCount: number;
    trendText?: string;
  };
  receivables?: {
    amount: number;
    openBalancesCount: number;
    agingAvg?: string;
    healthPct?: string;
  };
  payables?: {
    amount: number;
    invoicesDueCount: number;
    nextPayment?: string;
    batchStatus?: string;
  };
}

export default function FinanceOverviewSection({
  codPending = {
    amount: 42850,
    receiptsCount: 14,
    trendText: "+8.4% this week",
  },
  receivables = {
    amount: 86400,
    openBalancesCount: 22,
    agingAvg: "4.2d",
    healthPct: "91.2% healthy",
  },
  payables = {
    amount: 31250,
    invoicesDueCount: 7,
    nextPayment: "Fuel logistics ($9.4k)",
    batchStatus: "Batch 04 Queued",
  },
}: FinanceOverviewSectionProps) {
  return (
    <div className="flex flex-col gap-space-sm mb-space-xl">
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            account_balance_wallet
          </span>
          <h2 className="text-headline-sm font-semibold text-on-surface">
            Section 1 · Finance Overview
          </h2>
          <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface-variant">
            LEDGER_REALTIME
          </span>
        </div>
        <Link
          className="text-label-md text-secondary hover:underline flex items-center gap-0.5 font-medium"
          href="/finance"
        >
          Ledger Details
          <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
        {/* Card 1: COD Pending */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border border-outline-variant/30">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-md text-on-surface-variant font-medium tracking-wide uppercase">
                COD Pending
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[13px]">trending_up</span>
                {codPending.trendText}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-headline-xl text-on-surface tracking-tight font-mono font-semibold">
                ${codPending.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant mb-4">
              Total pending cash collection ·{" "}
              <span className="font-medium text-on-surface">
                {codPending.receiptsCount} pending receipts
              </span>
            </p>
          </div>
          <div className="pt-3 flex items-center justify-between bg-surface-container-low/40 -mx-5 -mb-5 px-5 py-3 border-t border-outline-variant/20">
            <span className="text-label-sm text-outline uppercase font-mono">Escrow Node 02</span>
            <Link
              className="text-label-md text-secondary font-medium flex items-center gap-1 hover:translate-x-0.5 transition-transform"
              href="/finance"
            >
              <span>View in COD & Finance</span>
              <span className="material-symbols-outlined text-[16px]">trending_flat</span>
            </Link>
          </div>
        </div>

        {/* Card 2: Total Debit (Receivables) */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border border-outline-variant/30">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-md text-on-surface-variant font-medium tracking-wide uppercase">
                Total Debit (Receivables)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-label-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Customer Invoices
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-headline-xl text-on-surface tracking-tight font-mono font-semibold">
                ${receivables.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant mb-4">
              Customer receivables pending clearing ·{" "}
              <span className="font-medium text-on-surface">
                {receivables.openBalancesCount} open balances
              </span>
            </p>
          </div>
          <div className="pt-3 flex items-center justify-between bg-surface-container-low/40 -mx-5 -mb-5 px-5 py-3 border-t border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-mono text-label-sm text-on-surface-variant">
                Aging avg: {receivables.agingAvg}
              </span>
            </div>
            <span className="text-label-sm text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded font-semibold">
              {receivables.healthPct}
            </span>
          </div>
        </div>

        {/* Card 3: Total Credit (Payables) */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border border-outline-variant/30">
          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-md text-on-surface-variant font-medium tracking-wide uppercase">
                Total Credit (Payables)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 text-rose-800 text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[13px]">schedule</span>
                Due &lt; 7 Days
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-headline-xl text-on-surface tracking-tight font-mono font-semibold">
                ${payables.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant mb-4">
              Vendor & supplier payables ·{" "}
              <span className="font-medium text-rose-700">
                {payables.invoicesDueCount} vendor invoices due
              </span>
            </p>
          </div>
          <div className="pt-3 flex items-center justify-between bg-surface-container-low/40 -mx-5 -mb-5 px-5 py-3 border-t border-outline-variant/20">
            <span className="font-mono text-label-sm text-outline">
              Next: {payables.nextPayment}
            </span>
            <span className="text-label-sm text-rose-700 font-semibold">
              {payables.batchStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
