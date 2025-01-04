import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/ProductType";
import { RootState } from "../store";
import { getUserInfo } from "../../api";
export interface UserState {
  value: User | null,
  isLoading: boolean,
  errorMessage: string,
}

const initialState: UserState = {
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
    },
    setErrorMessageForUser: (state) => {
      state.errorMessage = '';
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
        state.errorMessage = "We are sorry, but there are some technical problems. Please try again later.";
      })
  },
})

export const { logOutUser, setErrorMessageForUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer;

export const getUser = createAsyncThunk(
  'user/getUser',
  async (token: string) => await getUserInfo(token)
);
