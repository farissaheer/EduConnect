import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tutors: [],
};

export const tutorSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    Tutors: (state, action) => {
      return {
        ...state,
        tutors: action.payload,
      };
    },
  },
});

export const { Tutors } = tutorSlice.actions;

export const tutorSliceReducer = tutorSlice.reducer;
