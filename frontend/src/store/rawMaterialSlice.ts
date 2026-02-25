import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rawMaterialService } from '../services/rawMaterialService';
import type { RawMaterial } from '../types/inventory';

interface RawMaterialState {
  items: RawMaterial[];
  loading: boolean;
  error: string | null;
}

const initialState: RawMaterialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchRawMaterials = createAsyncThunk(
  'rawMaterials/fetchRawMaterials',
  async () => {
    const response = await rawMaterialService.getAll();
    return response.data;
  }
);

export const deleteRawMaterial = createAsyncThunk(
  'rawMaterials/deleteRawMaterial',
  async (id: number) => {
    await rawMaterialService.delete(id);
    return id;
  }
);

const rawMaterialSlice = createSlice({
  name: 'rawMaterials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRawMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar insumos';
      })
      
      .addCase(deleteRawMaterial.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteRawMaterial.rejected, (state, action) => {
        state.error = action.error.message || 'Erro ao deletar insumo';
      });
  },
});

export default rawMaterialSlice.reducer;