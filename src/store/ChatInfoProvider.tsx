import { ReactNode, useMemo } from "react";
import { ChatInfoContext } from "./ChatContext";

const BUTTONS = [
  { id: "channels", label: "Channels", info: 1 },
  { id: "team", label: "Team chats", info: 0 },
  { id: "direct", label: "Direct messages", info: 2 },
];

export const ChatInfoProvider = ({ children }: { children: ReactNode }) => {
  const totalMessages = useMemo(
    () => BUTTONS.filter((btn) => btn.info > 0).length,
    []
  );

  return (
    <ChatInfoContext.Provider value={{ totalMessages }}>
      {children}
    </ChatInfoContext.Provider>
  );
};
