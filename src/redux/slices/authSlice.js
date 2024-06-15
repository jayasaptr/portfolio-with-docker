import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: JSON.parse(localStorage.getItem("auth")) || {},
  reducers: {
    handleLoginSlice: (state, action) => {
      // state.status = action.payload.status;
      // state.message = action.payload.message;
      // state.data = action.payload.data;
      state.payload = action.payload;
    },
  },
});

export const { handleLoginSlice } = authSlice.actions;
export default authSlice.reducer;
