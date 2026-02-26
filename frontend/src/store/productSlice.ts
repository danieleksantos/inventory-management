import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../services/productService';
import type { Product } from '../types/inventory';

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await productService.getAll();
    return response.data;
  },
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (data: { name: string; price: number }) => {
    const response = await productService.create(data);
    return response.data;
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({
    id,
    ...data
  }: {
    id: string | number;
    name: string;
    price: number;
  }) => {
    const response = await productService.update(id.toString(), data);
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string | number) => {
    await productService.delete(id.toString());
    return id;
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'ERRO AO CARREGAR PRODUTOS';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => String(item.id) === String(action.payload.id),
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => String(item.id) !== String(action.payload),
        );
      });
  },
});

export default productSlice.reducer;
