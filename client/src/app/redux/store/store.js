import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/AuthSlice";
import { cartSlice } from "../features/cart/CartSlice";
import { messageSlice } from "../features/message/MessageSlice";

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    cartReducer: cartSlice.reducer,
    messageReducer: messageSlice.reducer,
  },
});
