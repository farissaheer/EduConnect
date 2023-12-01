import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  login: [],
  userDetails: [],
  tutorDetails: [],
  tutorRequests: [],
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
        tutorDetails: [],
        tutorRequests: [],
      };
    },

    userList: (state, action) => {
      return {
        ...state,
        userDetails: action.payload,
      };
    },

    tutorList: (state, action) => {
      return {
        ...state,
        tutorDetails: action.payload,
      };
    },

    tutorRequest: (state, action) => {
      return {
        ...state,
        tutorRequests: action.payload,
      };
    },
  },
});

export const { LoginAdmin, LogoutAdmin, userList, tutorList, tutorRequest } =
  adminSlice.actions;

export const adminSliceReducer = adminSlice.reducer;
