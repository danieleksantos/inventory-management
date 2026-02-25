import api from './api';
import type { ProductionResponse } from '../types/inventory';

export const productionService = {
  getSuggestions: async () => {
    const response = await api.get<ProductionResponse>('/production-suggestions');
    return response.data;
  }
};