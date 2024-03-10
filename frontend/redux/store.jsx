import { configureStore } from '@reduxjs/toolkit';
 import APIReducer from "./slice/API"
 import globalSlice from "./slice/globalSlice"


 export const store = configureStore({
    reducer: {
      API: APIReducer,
      global: globalSlice,
    },
  });