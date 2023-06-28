import React, { useEffect, useState } from "react";
import { FlexCard } from "./tailwindComps/FlexCard";
import { useChatCotext } from "../context/ChatContext";
import ScrollToBottom from "react-scroll-to-bottom";

export const ChatBox = ({ socket }) => {
  const { userName, room } = useChatCotext();

  const [currentMessage, setCurrentMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const sendHandle = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        username: userName,
        room: room,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessages((msgs) => [...msgs, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((msgs) => [...msgs, data]);
      console.log(data);
    });
  }, [socket]);

  return (
    <>
      <FlexCard className="flex-col justify-between gap-4 max-w-[500px]  max-h-[500px] overflow-hidden">
        {/* header  */}
        <div className="header flex justify-center items-center p-2 bg-blue-500 text-white w-full">
          Joined Chat
        </div>
        {/* body  */}
        <ScrollToBottom className=" w-full h-full overflow-hidden ">
          {messages.length > 0 &&
            messages.map((msg, i) => {
              return (
                <div
                  key={i}
                  className={`flex w-full p-4 ${
                    msg.username === userName
                      ? " justify-end"
                      : " justify-start"
                  }`}
                >
                  <div className="flex flex-col gap-1 w-1/2">
                    <div
                      className={`w-full p-2 text-white rounded ${
                        msg.username === userName
                          ? " bg-green-500"
                          : " bg-blue-500"
                      }`}
                    >
                      {msg.message}
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="user">{msg.username}</div>
                      <div className="time">{msg.time}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </ScrollToBottom>

        {/* footer  */}
        <div className="footer flex justify-between items-center  w-full">
          <input
            className="border-none p-4  flex-1"
            type="text"
            placeholder="send msg ..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button className="p-4 flex-1" onClick={(e) => sendHandle(e)}>
            send
          </button>
        </div>
      </FlexCard>
    </>
  );
};
