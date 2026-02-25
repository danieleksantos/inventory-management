import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import rawMaterialReducer from './rawMaterialSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    rawMaterials: rawMaterialReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;