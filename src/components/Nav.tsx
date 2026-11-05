"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Dashboard", icon: "dashboard" },
  { href: "/finance", label: "Finance", icon: "account_balance_wallet" },
  { href: "/fleet", label: "Fleet", icon: "local_shipping" },
  { href: "/inventory", label: "Inventory", icon: "inventory_2" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {tabs.map((t) => {
        const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={
              "flex items-center gap-space-md rounded-lg px-space-md py-2.5 text-label-lg transition-colors " +
              (active
                ? "border-l-2 border-secondary-container bg-primary-container text-on-primary shadow-sm"
                : "text-on-primary-container hover:bg-primary-container/50 hover:text-on-primary")
            }
          >
            <span className="material-symbols-outlined text-[20px]">{t.icon}</span>
            <span>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
