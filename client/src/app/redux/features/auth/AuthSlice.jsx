import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      // Return a new state object with `value` set to true
      return {
        ...state,
        value: true,
      };
    },
    logout: (state) => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
