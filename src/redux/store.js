import { configureStore } from '@reduxjs/toolkit';
import product from '../redux/slices/productSlice';
import filter from '../redux/slices/filterSlice';
import cart from '../redux/slices/cartSlice';

export const store = configureStore({
  reducer: {
    product,
    filter,
    cart,
  },
});
