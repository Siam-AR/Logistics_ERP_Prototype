import type { VehicleStatus } from "@/lib/types";

export const STATUS_STYLES: Record<
    VehicleStatus,
    { bg: string; text: string; dot: string }
> = {
    Available: {
        bg: "bg-surface-container-highest",
        text: "text-on-surface",
        dot: "bg-secondary-container",
    },
    "On Trip": {
        bg: "bg-secondary-fixed",
        text: "text-on-secondary-fixed",
        dot: "bg-secondary",
    },
    "In Maintenance": {
        bg: "bg-surface-container-high",
        text: "text-on-surface",
        dot: "bg-outline",
    },
};
