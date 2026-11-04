// import Link from "next/link";
// import { getDb } from "@/lib/db";
// import { VEHICLE_STATUSES, type Vehicle } from "@/lib/types";
// import FleetView from "@/component/fleet/FleetView";

// export const dynamic = "force-dynamic";

// export default async function FleetPage({
//     searchParams,
// }: {
//     searchParams: Promise<{ status?: string }>;
// }) {
//     const { status } = await searchParams;
//     const filter = VEHICLE_STATUSES.find((s) => s === status);

//     const db = await getDb();
//     const docs = await db
//         .collection("vehicles")
//         .find()
//         .sort({ _id: -1 })
//         .toArray();
//     const all: Vehicle[] = docs.map((d) => ({
//         _id: d._id.toString(),
//         plate: d.plate,
//         vehicleType: d.vehicleType,
//         driver: d.driver,
//         status: d.status,
//         notes: d.notes ?? "",
//     }));

//     const count = (s: string) => all.filter((v) => v.status === s).length;
//     const tabs = [
//         { label: "All", href: "/fleet", n: all.length, active: !filter },
//         ...VEHICLE_STATUSES.map((s) => ({
//             label: s,
//             href: `/fleet?status=${encodeURIComponent(s)}`,
//             n: count(s),
//             active: filter === s,
//         })),
//     ];

//     return (
//         <div>
//             <h1 className="text-2xl font-semibold text-slate-900">Fleet</h1>
//             <p className="mb-6 text-sm text-slate-500">
//                 Vehicles and what each one is doing.
//             </p>

//             {/* Count per status — also acts as the status filter */}
//             <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
//                 {tabs.map((t) => (
//                     <Link
//                         key={t.label}
//                         href={t.href}
//                         className={`rounded-lg border p-4 transition ${
//                             t.active
//                                 ? "border-slate-900 bg-white shadow-sm"
//                                 : "border-slate-200 bg-white hover:border-slate-400"
//                         }`}
//                     >
//                         <div className="text-sm text-slate-500">{t.label}</div>
//                         <div className="text-3xl font-semibold text-slate-900">
//                             {t.n}
//                         </div>
//                     </Link>
//                 ))}
//             </div>

//             <FleetView
//                 vehicles={filter ? all.filter((v) => v.status === filter) : all}
//             />
//         </div>
//     );
// }
