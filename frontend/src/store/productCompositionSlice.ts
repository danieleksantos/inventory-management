import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productCompositionService } from '../services/productCompositionService';
import type { ProductComposition } from '../types/inventory';

interface CompositionState {
  items: ProductComposition[];
  loading: boolean;
  error: string | null;
}

const initialState: CompositionState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCompositions = createAsyncThunk(
  'productCompositions/fetchAll',
  async () => {
    const response = await productCompositionService.getAll();
    return response.data;
  },
);

export const addCompositionItem = createAsyncThunk(
  'productCompositions/addItem',
  async (data: ProductComposition) => {
    const response = await productCompositionService.create(data);
    return response.data;
  },
);

export const removeCompositionItem = createAsyncThunk(
  'productCompositions/removeItem',
  async (id: number) => {
    await productCompositionService.delete(id);
    return id;
  },
);

const productCompositionSlice = createSlice({
  name: 'productCompositions',
  initialState,
  reducers: {
    clearComposition: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompositions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompositions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCompositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'ERRO AO CARREGAR COMPOSIÇÕES';
      })
      .addCase(addCompositionItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(removeCompositionItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { clearComposition } = productCompositionSlice.actions;
export default productCompositionSlice.reducer;
