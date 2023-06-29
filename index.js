const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors());
const server = http.createServer(app);

const socketCon = new Server(server, {
  cors: {
    origin: "http://chat-app-8hqd.onrender.com/",
    methods: ["GET", "POST"],
  },
});

socketCon.on("connection", (socket) => {
  // FOR JOINING A ROOM
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with ${socket.id} id joined in this room: ${data}`);
  });
  // FOR SENDING MESSAGE
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server is running");
});
