import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    actionMsg: (state, action) => {
      state.value = action.payload; // Update the value field with the payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { actionMsg } = messageSlice.actions;

export default messageSlice.reducer;
