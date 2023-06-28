import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <ChatContext.Provider
      value={{
        userName,
        setUserName,
        room,
        setRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatCotext = () => {
  return useContext(ChatContext);
};
