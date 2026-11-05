import { getInitials } from "@/lib/format";
import type { Vehicle, VehicleStatus } from "@/lib/types";
import StatusDropdown from "./StatusDropdown";

interface Props {
    vehicles: Vehicle[];
    onStatusChange: (v: Vehicle, s: VehicleStatus) => void;
    onEdit: (v: Vehicle) => void;
    onDelete: (v: Vehicle) => void;
}

export default function VehicleTable({
    vehicles,
    onStatusChange,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
                <thead>
                    <tr className="h-10 bg-surface-container-low text-label-sm uppercase tracking-wider text-on-surface-variant">
                        <th className="pl-space-lg pr-space-md font-semibold">
                            Plate
                        </th>
                        <th className="px-space-md font-semibold">
                            Vehicle Type
                        </th>
                        <th className="px-space-md font-semibold">Driver</th>
                        <th className="px-space-md text-center font-semibold">
                            Status
                        </th>
                        <th className="px-space-md font-semibold">Notes</th>
                        <th className="pl-space-md pr-space-lg text-right font-semibold">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low text-body-md">
                    {vehicles.map((v) => (
                        <tr
                            key={v._id}
                            className="transition-colors hover:bg-surface-container-low/60"
                        >
                            <td className="py-3.5 pl-space-lg pr-space-md">
                                <div className="flex items-center gap-space-sm">
                                    <span className="material-symbols-outlined text-[20px] text-outline">
                                        local_shipping
                                    </span>
                                    <span className="font-mono text-data-mono font-semibold text-on-surface">
                                        {v.plate}
                                    </span>
                                </div>
                            </td>
                            <td className="px-space-md py-3.5 font-medium text-on-surface">
                                {v.vehicleType}
                            </td>
                            <td className="px-space-md py-3.5">
                                <div className="flex items-center gap-space-sm">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-container text-label-sm font-bold text-on-surface ring-1 ring-surface-container-high">
                                        {getInitials(v.driver)}
                                    </div>
                                    <span className="font-medium text-on-surface">
                                        {v.driver}
                                    </span>
                                </div>
                            </td>
                            <td className="px-space-md py-3.5 text-center">
                                <StatusDropdown
                                    status={v.status}
                                    onChange={(s) => onStatusChange(v, s)}
                                />
                            </td>
                            <td className="px-space-md py-3.5 text-body-sm text-on-surface-variant">
                                {v.notes || "—"}
                            </td>
                            <td className="py-3.5 pl-space-md pr-space-lg text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <button
                                        type="button"
                                        title="Edit vehicle"
                                        onClick={() => onEdit(v)}
                                        className="flex h-8 w-8 items-center justify-center rounded text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            edit
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        title="Delete vehicle"
                                        onClick={() => onDelete(v)}
                                        className="flex h-8 w-8 items-center justify-center rounded text-on-surface-variant transition-colors hover:bg-error/10 hover:text-error"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            delete
                                        </span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {vehicles.length === 0 && (
                        <tr>
                            <td
                                colSpan={6}
                                className="py-12 text-center text-body-sm text-outline"
                            >
                                No vehicles found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
