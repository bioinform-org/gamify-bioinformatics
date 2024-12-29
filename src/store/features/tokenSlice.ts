import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { loginUser, regestrUser } from "../../api";
import { Role } from "../../types/Roles";

export interface TokenState {
  value: string | null,
  isLoading: boolean,
  errorMessage: string,
}

const initialState: TokenState = {
  value: null,
  isLoading: false,
  errorMessage: '',
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    getTokenFromStorage: (state) => {
      state.isLoading = true;
      const token = localStorage.getItem('token');

      if (token) {
        state.value = token;
      }

      state.isLoading = false;
    },
    removeToken: (state) => {
      localStorage.removeItem('token');
      state.value = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getTokenFromLogin.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(getTokenFromLogin.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token),
        state.isLoading = false;
        state.value = action.payload.token;
      })
      .addCase(getTokenFromLogin.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Unable to get a token from logging';
      })
      .addCase(getTokenFromRegestration.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(getTokenFromRegestration.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token),
        state.isLoading = false;
        state.value = action.payload.token;
      })
      .addCase(getTokenFromRegestration.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Unable to get a token from regestration';
      })
  }
})

export const { getTokenFromStorage, removeToken } = tokenSlice.actions

export const selectToken = (state: RootState) => state.token;

export default tokenSlice.reducer;

export const getTokenFromLogin = createAsyncThunk(
  'token/getTokenFromLogin',
  async ({ 
    email, 
    password,
  }: {
    email: string,
    password: string,
  }) => await loginUser(email, password),
);

export const getTokenFromRegestration = createAsyncThunk(
  'token/getTokenFromRegestration',
  async ({ 
    email, 
    password, 
    username, 
    roles,
  }: {
    email: string,
    password: string,
    username: string,
    roles: Role.user | Role.admin,
  }) => await regestrUser(email, password, username, roles),
);

