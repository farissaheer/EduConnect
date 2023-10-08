import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {};

export const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logoutUser: (state, action) => {
      Cookies.remove("userDetails", { secure: true, expires: new Date(0) });
      return [];
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
