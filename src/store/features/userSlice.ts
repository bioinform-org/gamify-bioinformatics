import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/ProductType";
import { RootState } from "../store";

export interface userState {
  value: User | Object,
}

const initialState: userState = {
  value: {},
}

//for api request we have to use thunks

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    //getUser will be used to make an api request to get a user from server
    getUser: (state, action: PayloadAction<{email: string, password: string}>) => {
      state.value = action.payload;
    },

    //this function will be used to delete user from database using delete request
    deleteUser: (state, action: PayloadAction<{ userId: number }>) => {
      state.value = action.payload;
    },

    //this function will be used to update user info using update request
    updateUser: (state, action: PayloadAction<{ email?: string, password?: string, userName?: string }>) => {
      state.value = action.payload;
    },

    //temporary thi function will set a new user, while database and server are in development
    //later it should send post request to create a new user
    createUser: (state, action: PayloadAction<{ email: string, password: string, userName: string }>) => {
      state.value = action.payload;
    },
  }
})

export const { setUser, createUser, updateUser, deleteUser, getUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value

export default userSlice.reducer;