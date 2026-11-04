import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "BisTech Logistics ERP",
  description: "Logistics ERP Prototype",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="font-sans">
        <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-primary text-on-primary">
          <div className="flex h-14 items-center justify-between px-space-lg">
            <div className="flex flex-col leading-tight">
              <span className="text-headline-sm">BisTech</span>
              <span className="text-label-sm uppercase text-on-primary-container">Logistics ERP</span>
            </div>
            <span className="rounded border border-on-primary-container/20 bg-primary-container px-space-xs py-0.5 text-label-sm uppercase text-tertiary-fixed">
              v0.1
            </span>
          </div>
          <div className="px-space-md py-space-sm">
            <div className="flex items-center justify-between rounded-lg bg-tertiary/60 px-space-sm py-1.5">
              <span className="text-label-sm uppercase tracking-wider text-on-primary-container">Environment</span>
              <span className="font-mono text-label-sm text-tertiary-fixed-dim">PROTOTYPE</span>
            </div>
          </div>
          <div className="px-space-md pt-space-xs">
            <p className="px-space-sm pb-space-xs text-label-sm uppercase tracking-wider text-on-primary-container">
              Operations Core
            </p>
            <Nav />
          </div>
        </aside>
        <main className="min-h-screen pl-64">
          <div className="px-space-lg pb-space-xl">{children}</div>
        </main>
      </body>
    </html>
  );
}
