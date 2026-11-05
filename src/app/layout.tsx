import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "BisTech ERP Prototype",
  description: "Developed by Developer of BisTech",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="font-sans bg-surface" suppressHydrationWarning>
        <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col justify-between bg-primary text-on-primary shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col">
            <div className="flex h-14 items-center justify-between px-space-lg">
              <div className="flex flex-col leading-tight">
                <span className="text-headline-sm font-semibold tracking-tight text-on-primary">BisTech</span>
                <span className="text-label-sm uppercase text-on-primary-container leading-none">Logistics ERP</span>
              </div>
              <span className="rounded border border-on-primary-container/20 bg-primary-container px-space-xs py-0.5 text-label-sm uppercase text-tertiary-fixed">
                v0.1
              </span>
            </div>
            <div className="px-space-md py-space-sm">
              <div className="flex items-center justify-between rounded-lg bg-tertiary/60 px-space-sm py-1.5">
                <div className="flex items-center gap-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
                  <span className="text-label-sm uppercase tracking-wider text-on-primary-container">Environment</span>
                </div>
                <span className="font-mono text-label-sm text-tertiary-fixed-dim">PROTOTYPE</span>
              </div>
            </div>
            <div className="px-space-md pt-space-xs">
              <p className="px-space-sm pb-space-xs text-label-sm uppercase tracking-wider text-on-primary-container">
                Operations Core
              </p>
              <Nav />
            </div>
          </div>

          <div className="p-space-md">
            <div className="p-space-md rounded-xl bg-primary-container/70 flex flex-col gap-space-xs">
              <div className="flex items-center justify-between text-on-primary-container">
                <span className="font-label-sm text-label-sm uppercase tracking-wider">Cluster Status</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">cloud_done</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                <span className="font-mono text-label-sm text-on-primary">Operational · 3 Nodes</span>
              </div>
              <div className="w-full bg-tertiary-container h-1 rounded-full overflow-hidden mt-1">
                <div className="bg-secondary-fixed w-full h-full"></div>
              </div>
            </div>
          </div>
        </aside>

        <Header />

        <main className="min-h-screen pl-64 pt-14 bg-surface">
          <div className="px-space-lg pb-space-xl">{children}</div>
        </main>
      </body>
    </html>
  );
}
