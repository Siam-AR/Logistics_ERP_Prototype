import type { Vehicle } from "@/lib/types";

export default function KpiCards({ vehicles }: { vehicles: Vehicle[] }) {
    const count = (s: Vehicle["status"]) =>
        vehicles.filter((v) => v.status === s).length;

    const cards = [
        {
            label: "Total Fleet",
            value: vehicles.length,
            icon: "local_shipping",
            bar: "bg-surface-container-low",
        },
        {
            label: "Available",
            value: count("Available"),
            icon: "check_circle",
            bar: "bg-surface-container-highest",
        },
        {
            label: "On Trip",
            value: count("On Trip"),
            icon: "alt_route",
            bar: "bg-secondary",
        },
        {
            label: "In Maintenance",
            value: count("In Maintenance"),
            icon: "build",
            bar: "bg-outline",
        },
    ];

    return (
        <div className="mb-space-lg grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
                <div
                    key={c.label}
                    className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm"
                >
                    <div className="mb-space-sm flex items-center justify-between">
                        <span className="text-label-md font-medium text-on-surface-variant">
                            {c.label}
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-low text-primary">
                            <span className="material-symbols-outlined text-[20px]">
                                {c.icon}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-space-xs">
                        <span className="text-headline-xl text-on-surface">
                            {c.value}
                        </span>
                        <span className="text-label-md font-medium text-on-surface-variant">
                            Vehicles
                        </span>
                    </div>
                    <div
                        className={`absolute bottom-0 left-0 right-0 h-1 ${c.bar}`}
                    />
                </div>
            ))}
        </div>
    );
}
