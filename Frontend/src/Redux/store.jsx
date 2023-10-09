import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { userSliceReducer } from "./UserSlice/userSlice";
import storage from "redux-persist/lib/storage";
import { adminSLiceReducer } from "./AdminSlice/adminSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducerOG = combineReducers({
  user: userSliceReducer,
  admin: adminSLiceReducer,
});

const reducer = persistReducer(persistConfig, reducerOG);

const store = configureStore({ reducer });

export const persistor = persistStore(store);
export default store;
