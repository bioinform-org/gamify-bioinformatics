import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Message {
    id: number;
    sender: string,
    content: string,
    time: string,
    position: string
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
