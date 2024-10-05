// import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import "dotenv/config";

// const app = express();
const httpServer = createServer();

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

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// import { createServer } from "node:http";
// import next from "next";
// import { Server } from "socket.io";

// // const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = 3000;
// // when using middleware `hostname` and `port` must be provided below
// const app = next({ hostname, port });
// const handler = app.getRequestHandler();

// app.prepare().then(() => {
//   const httpServer = createServer(handler);

//   const io = new Server(httpServer);

//   let activeUsers = 0;

//   wsServer.on("connection", (socket) => {
//     activeUsers++;
//     console.log(`User connected. Active users: ${activeUsers}`);

//     io.emit("activeUsers", activeUsers);

//     socket.on("disconnect", () => {
//       activeUsers--;
//       console.log(`User disconnected. Active users: ${activeUsers}`);
//       io.emit("activeUsers", activeUsers);
//     });

//     httpServer
//       .once("error", (err) => {
//         console.error(err);
//         process.exit(1);
//       })
//       .listen(port, () => {
//         console.log(`> Ready on http://${hostname}:${port}`);
//       });
//   });
// });
