import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { loginUser, regestrUser } from "../../api";
import { Role } from "../../types/Roles";
import { AxiosError } from "axios";

export interface TokenState {
  value: string | null,
  isLoading: boolean,
  isAppLoading: boolean,
  errorMessage: string,
}

const initialState: TokenState = {
  value: null,
  isLoading: false,
  isAppLoading: true,
  errorMessage: '',
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    getTokenFromStorage: (state) => {
      state.isAppLoading = true;
      const token = localStorage.getItem('token');
      state.value = token;
      state.isAppLoading = false;
    },
    removeToken: (state) => {
      localStorage.removeItem('token');
      state.value = null;
    },
    setErorrMessageForToken: (state) => {
      state.errorMessage = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getTokenFromLogin.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(getTokenFromLogin.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        state.isLoading = false;
        state.value = action.payload.token;
      })
      .addCase(getTokenFromLogin.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Incorrect email or password. Please try again.';
      })
      .addCase(getTokenFromRegestration.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(getTokenFromRegestration.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        state.isLoading = false;
        state.value = action.payload.token;
      })
      .addCase(getTokenFromRegestration.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = (action.payload as { message: string }).message;
      })
  }
})

export const { getTokenFromStorage, removeToken, setErorrMessageForToken } = tokenSlice.actions

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
  }, { rejectWithValue }) => {
    try {
      return await loginUser(email, password);
    } catch (err) {
      if (!(err as AxiosError).response) {
        throw err;
      }

      return rejectWithValue((err as AxiosError).response?.data)
    }
  },
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
  }, { rejectWithValue }) => {
    try {
      return await regestrUser(email, password, username, roles);
    } catch (err) {
      if (!(err as AxiosError).response) {
        throw err;
      }

      return rejectWithValue((err as AxiosError).response?.data)
    }
  },
);

