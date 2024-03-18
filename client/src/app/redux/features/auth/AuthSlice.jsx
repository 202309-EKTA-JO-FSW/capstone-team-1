import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "User",
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
