import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/AuthSlice";
import { cartSlice } from "../features/cart/CartSlice";

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    cartReducer: cartSlice.reducer,
  },
});
