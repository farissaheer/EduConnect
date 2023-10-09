import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  login: [],
  userDetails: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    LoginAdmin: (state, action) => {
      return {
        ...state,
        login: action.payload,
      };
    },

    LogoutAdmin: (state, action) => {
      Cookies.remove("userDetails", { secure: true });
      return {
        ...state,
        login: [],
        userDetails: [],
      };
    },

    userList: (state, action) => {
      return {
        ...state,
        userDetails: action.payload
      }
    },
  },
});

export const { LoginAdmin, LogoutAdmin, userList } = adminSlice.actions;

export const adminSLiceReducer = adminSlice.reducer;
