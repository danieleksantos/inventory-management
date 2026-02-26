import api from './api';
import type { Product } from '../types/inventory';
import type { AxiosResponse } from 'axios';

export const productService = {
  getAll: (): Promise<AxiosResponse<Product[]>> =>
    api.get<Product[]>('/products'),

  create: (data: Partial<Product>): Promise<AxiosResponse<Product>> =>
    api.post<Product>('/products', data),

  update: (
    id: string,
    data: Partial<Product>,
  ): Promise<AxiosResponse<Product>> =>
    api.put<Product>(`/products/${id}`, data),

  delete: (id: string): Promise<AxiosResponse<void>> =>
    api.delete(`/products/${id}`),
};
