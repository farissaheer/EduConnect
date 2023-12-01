import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userSliceReducer } from "./UserSlice/userSlice";
import { courseSliceReducer } from "./UserSlice/courseSlice";
import { cartSliceReducer } from "./UserSlice/cartSlice";
import { tutorSliceReducer } from "./UserSlice/tutorSlice";
import { adminSliceReducer } from "./AdminSlice/adminSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducerOG = combineReducers({
  user: userSliceReducer,
  admin: adminSliceReducer,
  courses: courseSliceReducer,
  cartItems: cartSliceReducer,
  tutors: tutorSliceReducer,
});

const reducer = persistReducer(persistConfig, reducerOG);

const store = configureStore({ reducer });

export const persistor = persistStore(store);
export default store;
