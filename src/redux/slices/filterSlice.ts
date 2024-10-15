import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SortListItem } from "@/components";
import { RootState } from "../store";

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  sortProperty: SortListItem;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sortProperty: {
    name: "popularity",
    sortProperty: "rating",
  },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortState(state, action: PayloadAction<SortListItem>) {
      state.sortProperty = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortProperty = action.payload.sortProperty;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});
export const selectfilter = (state: RootState) => state.filterReducer;

export const selectSort = (state: RootState) =>
  state.filterReducer.sortProperty;

export default filterSlice.reducer;

export const { setCategoryId, setSortState, setCurrentPage, setFilters } =
  filterSlice.actions;
