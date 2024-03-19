import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    itemsCount: (state, action) => {
      // Return a new state object with `value` set to true
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { itemsCount } = cartSlice.actions;

export default cartSlice.reducer;
