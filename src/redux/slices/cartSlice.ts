import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = Number(
        state.items
          .reduce((sum, obj) => {
            return obj.price * obj.count + sum;
          }, 0)
          .toFixed(2)
      );
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count > 1) {
        findItem.count--;
      }
      state.totalPrice = Number(
        state.items
          .reduce((sum, obj) => {
            return obj.price * obj.count + sum;
          }, 0)
          .toFixed(2)
      );
      if (state.totalPrice === 0.0) {
        state.totalPrice = 0;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = Number(
        state.items
          .reduce((sum, obj) => {
            return obj.price * obj.count + sum;
          }, 0)
          .toFixed(2)
      );
      if (state.totalPrice === 0.0) {
        state.totalPrice = 0;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cartReducer;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cartReducer.items.find((obj) => obj.id === id);

export default cartSlice.reducer;

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
