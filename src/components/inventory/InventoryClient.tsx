"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { InventoryItem } from "@/lib/types";

type Filter = "all" | "low" | "optimal";
type FormState = { name: string; sku: string; quantity: string; unit: string; lowStockLevel: string };

const UNITS = ["pcs", "kg", "box", "roll", "pallet"];
const emptyForm: FormState = { name: "", sku: "", quantity: "", unit: "pcs", lowStockLevel: "" };
const isLow = (i: InventoryItem) => i.quantity <= i.lowStockLevel;

const inputCls =
  "h-9 w-full rounded-lg bg-surface-container-low px-3 text-body-md text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary";

function Modal({
  title,
  icon,
  maxWidth = "max-w-lg",
  onClose,
  children,
}: {
  title: string;
  icon: string;
  maxWidth?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`w-full ${maxWidth} max-h-[90vh] overflow-y-auto rounded-xl bg-surface-container-lowest p-space-lg shadow-xl`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between border-b border-surface-container pb-3">
          <h2 className="flex items-center gap-2 text-title-md font-semibold text-on-surface">
            <span className="material-symbols-outlined text-secondary">{icon}</span>
            {title}
          </h2>
          <button type="button" aria-label="Close dialog" onClick={onClose} className="rounded-lg p-1 hover:bg-surface-container">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

async function send(url: string, method: string, body?: unknown): Promise<string | null> {
  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.ok) return null;
    const data = await res.json().catch(() => ({}));
    return data.error || "Something went wrong";
  } catch {
    return "Network error";
  }
}

export default function InventoryClient({ items }: { items: InventoryItem[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  // add / edit modal
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<InventoryItem | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  // adjust modal
  const [adjusting, setAdjusting] = useState<InventoryItem | null>(null);
  const [newCount, setNewCount] = useState("");

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const lowTotal = items.filter(isLow).length;

  const visible = useMemo(() => {
    const q = search.toLowerCase().trim();
    return items.filter((i) => {
      if (filter === "low" && !isLow(i)) return false;
      if (filter === "optimal" && isLow(i)) return false;
      if (!q) return true;
      return [i.name, i.sku, i.unit].some((v) => v.toLowerCase().includes(q));
    });
  }, [items, filter, search]);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setFormOpen(true);
  }

  function openEdit(i: InventoryItem) {
    setEditing(i);
    setForm({
      name: i.name,
      sku: i.sku,
      quantity: String(i.quantity),
      unit: i.unit,
      lowStockLevel: String(i.lowStockLevel),
    });
    setError("");
    setFormOpen(true);
  }

  function openAdjust(i: InventoryItem) {
    setAdjusting(i);
    setNewCount(String(i.quantity));
    setError("");
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const body = {
      name: form.name,
      sku: form.sku,
      unit: form.unit,
      quantity: Number(form.quantity),
      lowStockLevel: Number(form.lowStockLevel),
    };
    const err = editing
      ? await send(`/api/inventory/${editing._id}`, "PUT", body)
      : await send("/api/inventory", "POST", body);
    setBusy(false);
    if (err) return setError(err);
    setFormOpen(false);
    router.refresh();
  }

  async function submitAdjust() {
    if (!adjusting) return;
    const n = Number(newCount);
    if (newCount === "" || !Number.isFinite(n) || n < 0) return setError("Enter a valid number (0 or more)");
    setBusy(true);
    const err = await send(`/api/inventory/${adjusting._id}`, "PUT", { quantity: n });
    setBusy(false);
    if (err) return setError(err);
    setAdjusting(null);
    router.refresh();
  }

  async function remove(i: InventoryItem) {
    if (!confirm(`Delete ${i.sku} (${i.name})?`)) return;
    const err = await send(`/api/inventory/${i._id}`, "DELETE");
    if (err) return alert(err);
    router.refresh();
  }

  function delta(d: number) {
    setNewCount(String(Math.max(0, (Number(newCount) || 0) + d)));
  }

  const tabCls = (active: boolean) =>
    "rounded-lg px-space-md py-1.5 text-label-md transition-all " +
    (active
      ? "bg-surface-container-lowest font-semibold text-on-surface shadow-xs"
      : "text-on-surface-variant hover:text-on-surface");

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col items-stretch justify-between gap-space-md rounded-t-xl bg-surface-container-lowest p-space-md shadow-sm md:flex-row md:items-center">
        <div className="flex items-center gap-1 overflow-x-auto rounded-lg bg-surface-container-low p-1">
          <button type="button" className={tabCls(filter === "all")} onClick={() => setFilter("all")}>
            All Items ({items.length})
          </button>
          <button
            type="button"
            className={tabCls(filter === "low") + " flex items-center gap-1.5"}
            onClick={() => setFilter("low")}
          >
            <span className="h-2 w-2 rounded-full bg-error" />
            Low Stock ({lowTotal})
          </button>
          <button type="button" className={tabCls(filter === "optimal")} onClick={() => setFilter("optimal")}>
            Optimal ({items.length - lowTotal})
          </button>
        </div>

        <div className="flex max-w-xl flex-1 items-center justify-end gap-space-sm">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline">
              search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by SKU, item name, unit..."
              className="h-9 w-full rounded-lg bg-surface-container-low pl-9 pr-3 text-body-sm placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="flex h-9 shrink-0 items-center gap-2 rounded-lg bg-primary px-space-md text-label-lg text-on-primary shadow-sm transition-all hover:bg-primary-container active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_box</span>
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-b-xl bg-surface-container-lowest shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="h-10 select-none bg-surface-container-low text-label-sm uppercase tracking-wider text-on-surface-variant">
                <th className="w-12 px-space-lg py-2.5 text-center">#</th>
                <th className="min-w-[240px] px-space-md py-2.5">Item Name</th>
                <th className="min-w-[130px] px-space-md py-2.5">SKU / Code</th>
                <th className="min-w-[130px] px-space-md py-2.5 text-right">Quantity</th>
                <th className="min-w-[90px] px-space-md py-2.5 text-center">Unit</th>
                <th className="min-w-[120px] px-space-md py-2.5 text-right">Low-Stock Level</th>
                <th className="min-w-[150px] px-space-md py-2.5 text-center">Status</th>
                <th className="min-w-[170px] px-space-lg py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {visible.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-space-lg py-10 text-center text-body-sm text-on-surface-variant">
                    No items found.
                  </td>
                </tr>
              )}
              {visible.map((i, idx) => {
                const low = isLow(i);
                return (
                  <tr
                    key={i._id}
                    className={
                      "transition-colors " +
                      (low ? "bg-error-container/20 hover:bg-error-container/30" : "hover:bg-surface-container-low/50")
                    }
                  >
                    <td className="px-space-lg py-3 text-center font-mono text-label-sm text-on-surface-variant">
                      {String(idx + 1).padStart(2, "0")}
                    </td>
                    <td className="px-space-md py-3">
                      <span className="text-body-md font-semibold text-on-surface">{i.name}</span>
                    </td>
                    <td className="px-space-md py-3">
                      <span className="rounded bg-surface-container-low px-2 py-0.5 font-mono text-label-md font-medium text-primary">
                        {i.sku}
                      </span>
                    </td>
                    <td className="px-space-md py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {low && <span className="material-symbols-outlined text-[16px] text-error">warning</span>}
                        <span className={"font-mono text-body-lg font-bold " + (low ? "text-error" : "text-on-surface")}>
                          {i.quantity.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-space-md py-3 text-center">
                      <span className="rounded bg-surface-container-low px-2 py-1 text-label-md uppercase text-on-surface-variant">
                        {i.unit}
                      </span>
                    </td>
                    <td className="px-space-md py-3 text-right font-mono text-body-md font-medium text-on-surface-variant">
                      {i.lowStockLevel.toLocaleString()}
                    </td>
                    <td className="px-space-md py-3 text-center">
                      {low ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-error-container px-2.5 py-1 text-label-sm font-semibold uppercase text-on-error-container">
                          <span className="h-1.5 w-1.5 rounded-full bg-error" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-2.5 py-1 text-label-sm font-semibold uppercase text-on-surface">
                          <span className="h-1.5 w-1.5 rounded-full bg-secondary-container" />
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="px-space-lg py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openAdjust(i)}
                          className="flex h-8 items-center gap-1 rounded-lg bg-surface-container-low px-2.5 text-label-md text-primary transition-colors hover:bg-secondary-fixed"
                        >
                          <span className="material-symbols-outlined text-[16px]">tune</span>
                          Adjust
                        </button>
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => openEdit(i)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => remove(i)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-surface-container bg-surface-container-low px-space-lg py-3 text-body-sm text-on-surface-variant">
          Showing <span className="font-semibold text-on-surface">{visible.length}</span> of{" "}
          <span className="font-semibold text-on-surface">{items.length}</span> items
        </div>
      </div>

      {/* Add / Edit modal */}
      {formOpen && (
        <Modal
          title={editing ? "Edit Inventory Item" : "Add New Inventory Item"}
          icon={editing ? "edit_document" : "add_box"}
          onClose={() => setFormOpen(false)}
        >
          <form onSubmit={submitForm} className="space-y-4">
            <div>
              <label className="mb-1 block text-label-md font-semibold">Item Name *</label>
              <input
                required
                className={inputCls}
                value={form.name}
                placeholder="e.g. Industrial Pallet Shrink Film 500mm"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-label-md font-semibold">SKU / Code *</label>
                <input
                  required
                  className={inputCls + " font-mono uppercase"}
                  value={form.sku}
                  placeholder="e.g. SKU-LOG-999"
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-label-md font-semibold">Unit *</label>
                <select
                  className={inputCls}
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-label-md font-semibold">Quantity in Stock *</label>
                <input
                  required
                  type="number"
                  min={0}
                  className={inputCls + " font-mono"}
                  value={form.quantity}
                  placeholder="0"
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-label-md font-semibold">Low-Stock Level *</label>
                <input
                  required
                  type="number"
                  min={0}
                  className={inputCls + " font-mono"}
                  value={form.lowStockLevel}
                  placeholder="50"
                  onChange={(e) => setForm({ ...form, lowStockLevel: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-surface-container p-space-sm text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined mt-0.5 text-[16px] text-secondary">info</span>
              <span>When quantity is at or below the low-stock level, the item is highlighted in the table.</span>
            </div>
            {error && <p className="text-body-sm text-error">{error}</p>}
            <div className="flex items-center justify-end gap-space-sm border-t border-surface-container pt-3">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="h-9 rounded-lg bg-surface-container-low px-space-md text-label-md transition-colors hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-space-lg text-label-md text-on-primary transition-colors hover:bg-primary-container disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                {editing ? "Update Item" : "Save Item"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Adjust quantity modal */}
      {adjusting && (
        <Modal title="Adjust Quantity" icon="tune" maxWidth="max-w-sm" onClose={() => setAdjusting(null)}>
          <span className="font-mono text-label-sm font-semibold uppercase text-secondary">{adjusting.sku}</span>
          <div className="truncate text-label-lg font-semibold">{adjusting.name}</div>
          <div className="mt-2 flex items-baseline gap-2 rounded-lg bg-surface-container-low p-2">
            <span className="text-label-sm text-on-surface-variant">Current:</span>
            <span className="font-mono text-headline-sm font-bold">{adjusting.quantity.toLocaleString()}</span>
            <span className="text-label-sm text-on-surface-variant">{adjusting.unit}</span>
          </div>

          <p className="mb-1.5 mt-4 text-label-md text-on-surface-variant">Add / remove</p>
          <div className="mb-4 grid grid-cols-4 gap-2">
            {[-10, -1, 1, 10].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => delta(d)}
                className={
                  "h-8 rounded bg-surface-container-low font-mono text-label-md font-semibold transition-colors hover:bg-surface-container " +
                  (d < 0 ? "text-error" : "text-secondary")
                }
              >
                {d > 0 ? `+${d}` : d}
              </button>
            ))}
          </div>

          <label className="mb-1 block text-label-md font-semibold">New quantity</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              className={inputCls + " flex-1 font-mono"}
              value={newCount}
              onChange={(e) => setNewCount(e.target.value)}
            />
            <span className="px-2 text-label-md uppercase text-on-surface-variant">{adjusting.unit}</span>
          </div>
          {error && <p className="mt-2 text-body-sm text-error">{error}</p>}
          <div className="mt-4 flex items-center justify-end gap-space-sm border-t border-surface-container pt-3">
            <button
              type="button"
              onClick={() => setAdjusting(null)}
              className="h-8 rounded-lg bg-surface-container-low px-space-md text-label-md transition-colors hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={submitAdjust}
              className="h-8 rounded-lg bg-primary px-space-md text-label-md text-on-primary transition-colors hover:bg-primary-container disabled:opacity-50"
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
