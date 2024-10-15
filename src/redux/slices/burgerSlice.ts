import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";

type Burger = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface BurgerSliceState {
  items: Burger[];
  status: "loading" | "success" | "error";
}
export const fetchBurgers = createAsyncThunk<Burger[], Record<string, string>>(
  "burger/fetchByBurgersStatus",
  async (params: Record<string, string>) => {
    const { sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Burger[]>(
      `https://6601410a87c91a11641a6ac6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=asc${search}`
    );
    return data;
  }
);

const initialState: BurgerSliceState = {
  items: [],
  status: Status.LOADING,
};

const burgersSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgers.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchBurgers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchBurgers.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectBurgerData = (state: RootState) => state.burgersReducer;

export default burgersSlice.reducer;

export const { setItems } = burgersSlice.actions;
