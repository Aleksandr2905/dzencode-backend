import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import "dotenv/config";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  io.emit("activeUsers", io.engine.clientsCount);

  socket.on("disconnect", () => {
    io.emit("activeUsers", io.engine.clientsCount);
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
