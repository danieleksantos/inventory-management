import api from './api';
import type { Product } from '../types/inventory';

export const productService = {
  // GET /products
  getAll: async () => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },

  // POST /products
  create: async (product: Omit<Product, 'id'>) => {
    const response = await api.post<Product>('/products', product);
    return response.data;
  },

  // DELETE /products/:id
  delete: async (id: number) => {
    await api.delete(`/products/${id}`);
  }
};