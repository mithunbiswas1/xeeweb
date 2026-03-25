// src/redux/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/redux/apiSlice/apiSlice";

import cartDrawerReducer from "@/redux/features/Slice/CartDrawerSlice";
import wishlistReducer from "@/redux/features/Slice/WishListSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cartDrawer: cartDrawerReducer,
    wishlist: wishlistReducer,
  },

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(apiSlice.middleware),
});
