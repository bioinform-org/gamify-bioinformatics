import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/ProductType";
import { RootState } from "../store";
import { getUserInfo } from "../../api";

//but You can notice that there are 3 addCases
//There is also logOutUser function, which kinda helps in logging out just by setting user to null, which triggers AuthComponent (I guess)
export interface userState {
  value: User | null,
  isLoading: boolean,
  errorMessage: string,
}

const initialState: userState = {
  value: null,
  isLoading: false,
  errorMessage: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.value = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = "";
      })
  },
})

export const { logOutUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer;

export const getUser = createAsyncThunk(
  'user/getUser',
  async (token: string) => await getUserInfo(token)
);
