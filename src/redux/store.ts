import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import * as reducers from "./slices";

export const store = configureStore({
  reducer: {
    filterReducer: reducers.filterReducer,
    searchReducer: reducers.searchReducer,
    cartReducer: reducers.cartReducer,
    burgersReducer: reducers.burgerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
