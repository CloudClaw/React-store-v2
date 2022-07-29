import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetchProduct', async (params) => {
  const { sortBy, order, search, currentPage } = params;
  const { data } = await axios.get(
    `https://62cfc4261cc14f8c087ce036.mockapi.io/Shop?page=${currentPage}&limit=10&sortBy=${sortBy}&order=${order}&${search}`,
  );
  return data;
});

const initialState = {
  products: [],
  singleProduct: {},
  isLoading: true,
  currentPage: 1,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSingleProduct(state, action) {
      state.singleProduct = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.products = [];
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
		state.isLoading = false
    },
    [fetchProducts.rejected]: (state) => {
      state.products = [];
		state.isLoading = false
    },
  },
});

export const { setProduct, setSingleProduct, setIsLoading, setIsCurrentPage } =
  productSlice.actions;

export default productSlice.reducer;
