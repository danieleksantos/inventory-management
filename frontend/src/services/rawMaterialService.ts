import api from './api';
import type { RawMaterial } from '../types/inventory';
import type { AxiosResponse } from 'axios';

export const rawMaterialService = {
  getAll: (): Promise<AxiosResponse<RawMaterial[]>> =>
    api.get<RawMaterial[]>('/raw-materials'),
  create: (data: RawMaterial) => api.post<RawMaterial>('/raw-materials', data),
  update: (id: number, data: RawMaterial) =>
    api.put(`/raw-materials/${id}`, data),
  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/raw-materials/${id}`),
};
