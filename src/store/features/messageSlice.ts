import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Message {
    channelId: string | null;
    id: number;
    sender: string;
    content: string;
    time: string;
    position: string;
    read: boolean;
    category: string
}

interface MessageState {
    messages: Message[];
    loading: boolean;
    error: string | null;
}

const initialState: MessageState = {
    messages: [],
    loading: false,
    error: null,
};

export const fetchMessages = createAsyncThunk("messages/fetch", async () => {
    const response = await fetch("/api/messages.json");
    if (!response.ok) throw new Error("Failed to fetch messages");
    return await response.json();
});

export const selectUnreadMessagesCount = createSelector(
    (state: RootState) => state.messages.messages,
    (messages) => messages.filter((msg) => !msg.read).length
  );

export const selectUnreadCountByCategory = (categoryId: string) =>
    createSelector(
        (state: RootState) => state.messages.messages,
        (messages) => messages.filter(msg => msg.category === categoryId && !msg.read).length
    );

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Error";
            });
    },
});

export default messageSlice.reducer;
