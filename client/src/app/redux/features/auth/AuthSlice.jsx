import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    firstName: "",
    lastName: "",
    avatar: "",
    isLogin: false,
    isAdmin: false,
    restaurant: "",
  },
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        value: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          avatar: action.payload.avatar,
          isAdmin: action.payload.isAdmin,
          restaurant: action.payload.restaurant,
          isLogin: true,
        },
      };
    },
    logoutUser: (state) => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
