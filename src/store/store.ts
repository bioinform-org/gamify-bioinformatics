import { configureStore } from "@reduxjs/toolkit";
//userReducer (userSlice.reducer) is a default export of userSlice file
import userReducer from '../store/features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;