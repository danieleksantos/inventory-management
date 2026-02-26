import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import rawMaterialReducer from './rawMaterialSlice';
import productionReducer from './productionSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    rawMaterials: rawMaterialReducer,
    production: productionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
