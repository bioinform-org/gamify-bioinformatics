import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/ProductType";
import { RootState } from "../store";
import { getUserInfo, updateUserInfo, UpdateUserPropBody, UserAndToken } from "../../api";
// import { setToken } from "./tokenSlice";
// import { AxiosError } from "axios";

export interface UserState {
  value: User | UserAndToken | null,
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
    removeErrorMessageForUser: (state) => {
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
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = "We are sorry, but we can`t update your information. Please try again later.";
      })
  },
})

export const { logOutUser, removeErrorMessageForUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer;

export const getUser = createAsyncThunk(
  'user/getUser',
  async (token: string) => await getUserInfo(token)
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ 
    body, 
    propToken,
  } : { 
    body: UpdateUserPropBody, 
    propToken: string,
  }, 
  // {
  //   rejectWithValue,
  //   fulfillWithValue,
  // },
) => {
    //05.01.2024
    //check out redux documentation and find sth related to sharing state between slices
    //and then move dispatch setToken from app component to appropriate slice or another solution
    return await updateUserInfo(body, propToken);


    //4.01.2024
    //try to implement here a middleware or just get rid of this thunk and manually update everything using then and catch 
    //in resetPasswordSetNewPasswordPage with dispatches

    //fix the new error after removing dispatched from here;
    //write to a backender to ask him to add scorePoint to the body for the /user/update endpoint


    // try {
    //   return await updateUserInfo(body, propToken);
    //   // const res = await updateUserInfo(body, propToken);

    //   // if (res.token) {
    //   //   store.dispatch(setToken(token));
    //   // }

    //   // return fulfillWithValue(res);
    // } catch (error) {
    //   console.log('AsyncThunk error: ', error);
    //   if (!(error as AxiosError).response) {
    //     throw error;
    //   }

    //   return rejectWithValue(error);
    // }
  }
);
