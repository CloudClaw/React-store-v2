import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type FetchProductArgs = Record<string, string>;

export const fetchProducts = createAsyncThunk<Product[],FetchProductArgs>('product/fetchProduct', async (params) => {
  const { sortBy, order, search, currentPage } = params;
  const { data } = await axios.get<Product[]>(
    `https://62cfc4261cc14f8c087ce036.mockapi.io/Shop?page=${currentPage}&limit=10&sortBy=${sortBy}&order=${order}&${search}`,
  );
  return data
});

type Product = {
	name?: string;
	cart?:boolean;
	liked?:boolean;
	category?: string;
	description?: string;
	price?:number;
	img?:string;
	id?: number;
}

interface ProductSliceState {
	products: Product[],
  singleProduct: Product,
  isLoading: boolean,
  currentPage: number,
}

const initialState:ProductSliceState = {
  products: [],
  singleProduct: {},
  isLoading: true,
  currentPage: 1,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSingleProduct(state, action: PayloadAction<Product>) {
      state.singleProduct = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
	builder.addCase(fetchProducts.pending, (state) => {
		state.products = []
	})
	builder.addCase(fetchProducts.fulfilled, (state,action) => {
		state.products = action.payload;
		state.isLoading = false
	})
	builder.addCase(fetchProducts.rejected, (state) => {
		state.products = [];
		state.isLoading = false
	})
  },
});


export const selectProduct = (state:RootState) => state.product.products
export const { setSingleProduct, setIsLoading, setIsCurrentPage } =
  productSlice.actions;

export default productSlice.reducer;
