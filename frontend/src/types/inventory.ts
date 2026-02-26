export interface Product {
  id?: number;
  name: string;
  price: number;
}

export interface RawMaterial {
  id?: number;
  name: string;
  stockQuantity: number;
}

export interface ProductComposition {
  id?: number;
  productId?: number; // Usado para enviar ao backend (POST)
  rawMaterialId?: number; // Usado para enviar ao backend (POST)
  quantityNeeded: number;
  product?: Product; // Recebido do backend (GET)
  rawMaterial?: RawMaterial; // Recebido do backend (GET)
}

export interface ProductionSuggestion {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface StockRemainder {
  materialName: string;
  remainingQuantity: number;
}

export interface ProductionResponse {
  suggestions: ProductionSuggestion[];
  remainders: StockRemainder[];
}
