import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    CartItems: (state, action) => {
      return {
        ...state,
        cartItems: action.payload,
      };
    },
  },
});

export const { CartItems } = cartSlice.actions;

export const cartSliceReducer = cartSlice.reducer;
