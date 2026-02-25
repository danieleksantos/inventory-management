import api from './api';
import type { RawMaterial } from '../types/inventory';

export const rawMaterialService = {
  getAll: async () => {
    const response = await api.get<RawMaterial[]>('/raw-materials');
    return response.data;
  },
};