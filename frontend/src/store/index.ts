import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import rawMaterialReducer from './rawMaterialSlice';
import productionReducer from './productionSlice';
import productCompositionReducer from './productCompositionSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    rawMaterials: rawMaterialReducer,
    production: productionReducer,
    productCompositions: productCompositionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
