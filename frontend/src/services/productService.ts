import api from './api';
import type { Product } from '../types/inventory';
import type { AxiosResponse } from 'axios';

export const productService = {
  getAll: (): Promise<AxiosResponse<Product[]>> => api.get<Product[]>('/products'),
  create: (data: Product) => api.post<Product>('/products', data),
};