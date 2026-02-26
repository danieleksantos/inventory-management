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
