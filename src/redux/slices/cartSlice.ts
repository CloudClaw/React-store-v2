import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type CartItem = {
	id: number;
	img: string;
	price: number;
	name: string;
	count: number
	index: number;
}

interface CartSliceState {
	totalPrice: number;
	cartItems: CartItem[];
}

const {items, totalPrice} = getCartFromLS()

const initialState: CartSliceState = {
  cartItems: items,
  totalPrice: totalPrice
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem(state, action:PayloadAction<number>) {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        if (findItem.count< 1) {
          state.cartItems.splice(findItem.index, 1);
        }
      }
      state.totalPrice = calcTotalPrice(state.cartItems)
    },

    clearItems(state) {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addToCart, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
