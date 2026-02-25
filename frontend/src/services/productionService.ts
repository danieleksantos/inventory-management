import api from './api';
import type { ProductionResponse } from '../types/inventory';

export const productionService = {
  // GET /production-suggestions
  getSuggestions: async () => {
    const response = await api.get<ProductionResponse>('/production-suggestions');
    return response.data;
  }
};