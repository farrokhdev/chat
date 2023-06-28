import React, { useState } from "react";
import { FlexCard } from "./tailwindComps/FlexCard";
import { useChatCotext } from "../context/ChatContext";

export const ChatForm = ({ socket, setIsChat }) => {
  const { userName, setUserName, room, setRoom } = useChatCotext();

  const joinChat = async (e) => {
    e.preventDefault();
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setIsChat(true);
    }
  };

  return (
    <FlexCard className="flex-col gap-4 max-w-[500px]  max-h-[500px]">
      <h2>Join chat</h2>
      <form className="flex flex-col gap-4" action="">
        <input
          className="p-2 h-[40px]"
          type="text"
          placeholder="user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="p-2 h-[40px]"
          type="text"
          placeholder="room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinChat} className="p-2 h-[40px]">
          Join
        </button>
      </form>
    </FlexCard>
  );
};
