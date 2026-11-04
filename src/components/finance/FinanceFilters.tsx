import { DEFAULT_FILTERS, type FinanceFilters as Filters } from "@/lib/types";

interface Props {
    filters: Filters;
    onChange: (next: Filters) => void;
    onAddClick: () => void;
}

const selectClass =
    "h-9 pl-3 pr-8 rounded-lg bg-surface-container-low font-label-md text-label-md text-on-surface appearance-none focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer";

export default function FinanceFilters({
    filters,
    onChange,
    onAddClick,
}: Props) {
    const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
        onChange({ ...filters, [key]: value });

    return (
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm my-space-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
            <div className="flex flex-wrap items-center gap-space-sm flex-1 min-w-0">
                <div className="relative flex-1 min-w-65 max-w-md">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                        search
                    </span>
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => set("search", e.target.value)}
                        placeholder="Filter by party name or reference..."
                        className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                </div>

                <select
                    value={filters.type}
                    onChange={(e) =>
                        set("type", e.target.value as Filters["type"])
                    }
                    className={selectClass}
                >
                    <option value="ALL">Type: All</option>
                    <option value="COD">Type: COD</option>
                    <option value="DEBIT">Type: Debit</option>
                    <option value="CREDIT">Type: Credit</option>
                </select>

                <select
                    value={filters.status}
                    onChange={(e) =>
                        set("status", e.target.value as Filters["status"])
                    }
                    className={selectClass}
                >
                    <option value="ALL">Status: All</option>
                    <option value="PENDING">Status: Pending</option>
                    <option value="SETTLED">Status: Settled</option>
                </select>

                <button
                    type="button"
                    onClick={() => onChange(DEFAULT_FILTERS)}
                    className="h-9 px-space-sm rounded-lg hover:bg-surface-container font-label-md text-label-md text-on-surface-variant flex items-center gap-1 transition-colors"
                >
                    <span className="material-symbols-outlined text-[16px]">
                        restart_alt
                    </span>
                    Reset
                </button>
            </div>

            <button
                type="button"
                onClick={onAddClick}
                className="h-9 px-space-lg rounded-lg bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-inverse-surface active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-medium"
            >
                <span className="material-symbols-outlined text-[18px]">
                    add_circle
                </span>
                Add Finance Entry
            </button>
        </div>
    );
}
