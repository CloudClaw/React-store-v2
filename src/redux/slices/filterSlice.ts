import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FilterSliceState {
	searchValue: string;
	sort: string;
}

const initialState:FilterSliceState = {
  searchValue: '',
  sort: '',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setValue(state, action:PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const selectSort = (state:RootState)=> state.filter.sort
export const selectFilterSearch = (state:RootState) => state.filter.searchValue.toLowerCase()
export const { setSort, setValue } = filterSlice.actions;

export default filterSlice.reducer;
