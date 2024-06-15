import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: { auth: authReducer },
});

console.log("oncreate Store: ", store.getState());

store.subscribe(() => {
  console.log("STORE CHANGE : ", store.getState());
});

export default store;
