import type { Metadata } from "next";
import Image from "next/image";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

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
      <body className="font-sans" suppressHydrationWarning>
        <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-primary text-on-primary">
          <div className="flex h-14 items-center px-space-lg">
            <div className="flex items-center gap-space-xs">
              <Image src="/logo.png" alt="BisTech logo" width={32} height={32} className="object-contain" />
              <div className="flex flex-col leading-tight">
                <span className="text-headline-sm">BisTech</span>
                <span className="text-label-sm uppercase text-on-primary-container">Logistics ERP</span>
              </div>
            </div>
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
