import api from './api';
import type { ProductionResponse } from '../types/inventory';
import type { AxiosResponse } from 'axios';

export const productionService = {
  getSuggestions: (): Promise<AxiosResponse<ProductionResponse>> => 
    api.get<ProductionResponse>('/production-suggestions'), 
};