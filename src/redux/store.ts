import { configureStore } from '@reduxjs/toolkit';
import product from './slices/productSlice';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    product,
    filter,
    cart,
  },
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>() 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof store.getState>
