import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productionService } from '../services/productionService';
import type { ProductionResponse } from '../types/inventory';

interface ProductionState {
  data: ProductionResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductionState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchSuggestions = createAsyncThunk(
  'production/fetchSuggestions',
  async () => {
    const response = await productionService.getSuggestions();
    return response.data;
  },
);

const productionSlice = createSlice({
  name: 'production',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao calcular produção';
      });
  },
});

export default productionSlice.reducer;
