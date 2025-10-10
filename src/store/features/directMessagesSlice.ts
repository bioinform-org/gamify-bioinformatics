import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/ProductType";

export interface DirectMessage {
  name: string;
  userName: string;
}

interface ChannelState {
  directMessages: DirectMessage[];
  loading: boolean;
  error: string | null;
}

const initialState: ChannelState = {
  directMessages: [],
  loading: false,
  error: null,
};

export const fetchDirectMessages = createAsyncThunk("users/fetch", async () => {
  const response = await fetch("/api/users.json");
  if (!response.ok) throw new Error("Failed to fetch users");
  return await response.json();
});

const directMessagesSlice = createSlice({
  name: "directMessages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDirectMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.directMessages = action.payload.map((user: User) => ({
          name: user.name,
          userName: user.username,
        }));
      })
      .addCase(fetchDirectMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error";
      });
  },
});

export default directMessagesSlice.reducer;
