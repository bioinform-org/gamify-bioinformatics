import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatCategory {
  id: string;
  label: string;
  unreadCount: number;
}

interface ChatCategoryState {
  categories: ChatCategory[];
}

const initialState: ChatCategoryState = {
  categories: [
    { id: "channels", label: "Channels", unreadCount: 0 },
    { id: "team", label: "Team chats", unreadCount: 0 },
    { id: "direct", label: "Direct messages", unreadCount: 0 },
  ],
};

const chatCategorySlice = createSlice({
  name: "chatCategories",
  initialState,
  reducers: {
    setUnreadCount: (
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      const category = state.categories.find((c) => c.id === action.payload.id);
      if (category) {
        category.unreadCount = action.payload.count;
      }
    },
  },
});

export const { setUnreadCount } = chatCategorySlice.actions;

export default chatCategorySlice.reducer;
