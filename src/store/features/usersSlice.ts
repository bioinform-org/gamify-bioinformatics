import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { User } from "../../types/ProductType";

export const fetchUsers = createAsyncThunk<User[]>("users/fetchAll", async () => {
  const res = await fetch("/api/users.json");
  if (!res.ok) throw new Error("Failed to fetch users");
  return (await res.json()) as User[];
});

export interface UsersState {
  value: User[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: UsersState = {
  value: [],
  isLoading: false,
  errorMessage: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    upsertUser(state, action: { payload: User }) {
      const idx = state.value.findIndex((u) => u.id === action.payload.id);
      if (idx === -1) state.value.push(action.payload);
      else state.value[idx] = action.payload;
    },
    removeUser(state, action: { payload: number }) {
      state.value = state.value.filter((u) => u.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload.map((user) => ({
          ...user,
          photo: user.photo ?? "/images/avatar_by_default.svg",
        }));
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = "Users cannot be downloaded from the server";
      });
  },
});

export const { upsertUser, removeUser } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;