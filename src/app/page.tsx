import { Suspense } from "react";
import { connection } from "next/server";
import { getDashboardMetrics } from "@/lib/dashboard";
import DashboardView from "@/components/dashboard/DashboardView";

async function DashboardData() {
  await connection();
  const metrics = await getDashboardMetrics();
  return <DashboardView metrics={metrics} />;
}

function DashboardFallback() {
  return (
    <div className="flex flex-col w-full pb-12 animate-pulse pt-space-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-8 w-80 bg-surface-container-high rounded mb-2"></div>
          <div className="h-4 w-48 bg-surface-container-low rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-32 bg-surface-container-low rounded"></div>
          <div className="h-9 w-32 bg-surface-container-low rounded"></div>
        </div>
      </div>

      <div className="mb-8">
        <div className="h-6 w-48 bg-surface-container-low rounded mb-3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-44 bg-surface-container-lowest rounded-xl"></div>
          <div className="h-44 bg-surface-container-lowest rounded-xl"></div>
          <div className="h-44 bg-surface-container-lowest rounded-xl"></div>
        </div>
      </div>

      <div className="mb-8">
        <div className="h-6 w-48 bg-surface-container-low rounded mb-3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="h-32 bg-surface-container-lowest rounded-xl"></div>
          <div className="h-32 bg-surface-container-lowest rounded-xl"></div>
          <div className="h-32 bg-surface-container-lowest rounded-xl"></div>
          <div className="h-32 bg-surface-container-lowest rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardData />
    </Suspense>
  );
}
