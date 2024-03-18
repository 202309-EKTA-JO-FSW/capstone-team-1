import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    firstName: "",
    lastName: "",
    avatar: "",
    isAdmin: false,
    restaurant: "",
    isLogin: false,
  },
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { firstName, lastName, avatar, isAdmin, restaurant } =
        action.payload;
      return {
        ...state,
        firstName,
        lastName,
        avatar,
        isAdmin,
        restaurant,
        isLogin: true,
      };
    },
    logout: (state) => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
