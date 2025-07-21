import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Channel {
  id: string;
  label: string;
}

interface ChannelState {
  channels: Channel[];
  loading: boolean;
  error: string | null;
}

const initialState: ChannelState = {
  channels: [],
  loading: false,
  error: null,
};

export const fetchChannels = createAsyncThunk("channels/fetch", async () => {
  const response = await fetch("/api/channels.json");
  if (!response.ok) throw new Error("Failed to fetch channels");
  return await response.json();
});

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error";
      });
  },
});

export default channelSlice.reducer;
