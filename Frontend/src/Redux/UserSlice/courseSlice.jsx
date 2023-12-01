import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  courseSelected: {},
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    Courses: (state, action) => {
      return {
        ...state,
        courses: action.payload,
      };
    },
    CourseSelected: (state, action) => {
      return {
        ...state,
        courseSelected: action.payload,
      };
    },
  },
});

export const { Courses, CourseSelected } = courseSlice.actions;

export const courseSliceReducer = courseSlice.reducer;
