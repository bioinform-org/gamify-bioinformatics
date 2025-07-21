import { createContext, useContext } from "react";

export const ChatInfoContext = createContext<{ totalMessages: number }>({
  totalMessages: 0,
});

export const useChatInfo = () => useContext(ChatInfoContext);
