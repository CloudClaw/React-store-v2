import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  sort: '',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
    setValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSort, setValue } = filterSlice.actions;

export default filterSlice.reducer;
