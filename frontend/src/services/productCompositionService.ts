import api from './api';
import type { ProductComposition } from '../types/inventory';

export const productCompositionService = {
  getAll: () => api.get<ProductComposition[]>('/product-compositions'),

  getByProductId: (productId: number | string) =>
    api.get<ProductComposition[]>(`/product-compositions/product/${productId}`),

  create: (data: ProductComposition) =>
    api.post<ProductComposition>('/product-compositions', data),

  delete: (id: number) => api.delete(`/product-compositions/${id}`),
};
