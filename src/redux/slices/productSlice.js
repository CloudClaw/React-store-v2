import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  singleProduct: {},
  isLoading: false,
  currentPage: 1,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action) {
      state.products = action.payload;
    },
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
});

export const { setProduct, setSingleProduct, setIsLoading,setIsCurrentPage } = productSlice.actions;

export default productSlice.reducer;
