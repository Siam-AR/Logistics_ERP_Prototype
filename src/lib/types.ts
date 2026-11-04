export type InventoryItem = {
  _id: string;
  name: string;
  sku: string;
  quantity: number;
  unit: string;
  lowStockLevel: number;
};

// FinanceEntry and Vehicle will be added by the other developers.
