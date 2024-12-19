import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/ProductType";
import { getUsersFromServer } from "../../api";
import { RootState } from "../store";

//ALL INFORMATION HERE IS INDENTICAL TO EXERCISEsSLICE

export interface UsersState {
  value: User[] | [],
  isLoading: boolean,
  errorMessage: string,
}

const initialState: UsersState = {
  value: [],
  isLoading: false,
  errorMessage: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(getUsers.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value = action.payload;
    })
    .addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
      state.errorMessage = 'Users cannot be downloaded from the server'
    })
  }
});

export default usersSlice.reducer;

export const selectUsers = (state: RootState) => state.users;

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async () => await getUsersFromServer()
)