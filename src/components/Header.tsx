import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-14 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
      <div className="flex items-center gap-space-lg flex-1 max-w-xl">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            className="w-full h-9 pl-9 pr-12 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline border-0 focus:outline-none focus:ring-1 focus:ring-secondary"
            placeholder="Search orders, vehicles, SKU..."
            type="text"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-container font-mono text-label-sm text-on-surface-variant">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
        <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container-low">
          <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
          <span className="font-label-md text-label-md text-on-surface-variant">
            MongoDB Connected · 3 Nodes Active
          </span>
        </div>
      </div>
      <div className="flex items-center gap-space-md">
        <div className="hidden sm:flex items-center gap-space-xs">
          <Link
            href="/finance"
            className="h-8 px-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-on-surface flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Waybill</span>
          </Link>
          <button
            className="h-8 w-8 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            title="Notifications"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">notifications</span>
          </button>
          <button
            className="h-8 w-8 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            title="Audit Logs"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          </button>
        </div>
        <div className="h-6 w-px bg-surface-container"></div>
        <div className="flex items-center gap-space-sm pl-space-xs">
          <div className="flex flex-col text-right hidden md:flex">
            <span className="font-label-lg text-label-lg text-on-surface leading-tight font-medium">Sarah Jenkins</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">Operations Lead</span>
          </div>
          <div className="relative w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-medium text-label-md ring-1 ring-surface-container overflow-hidden">
            <span className="text-[12px] font-semibold">SJ</span>
          </div>
        </div>
      </div>
    </header>
  );
}
