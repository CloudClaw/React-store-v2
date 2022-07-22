import { configureStore } from '@reduxjs/toolkit';
import product from '../redux/slices/productSlice';
import filter from '../redux/slices/filterSlice';

export const store = configureStore({
  reducer: {
    product,
    filter,
  },
});
