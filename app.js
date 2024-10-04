import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();

const wsServer = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let activeUsers = 0;

wsServer.on("connection", (socket) => {
  activeUsers++;
  console.log(`User connected. Active users: ${activeUsers}`);

  wsServer.emit("activeUsers", activeUsers);

  socket.on("disconnect", () => {
    activeUsers--;
    console.log(`User disconnected. Active users: ${activeUsers}`);
    wsServer.emit("activeUsers", activeUsers);
  });
});

httpServer.listen(4000);

// import { Server } from "socket.io";

// const SocketHandler = (req, res) => {
//   if (res.socket.server.io) {
//     console.log("Socket is already running");
//   } else {
//     console.log("Socket is initializing");
//     const io = new Server(res.socket.server);
//     res.socket.server.io = io;

//     io.on("connection", (socket) => {
//       io.emit("activeUsers", io.engine.clientsCount);

//       socket.on("disconnect", () => {
//         io.emit("activeUsers", io.engine.clientsCount);
//       });
//     });
//   }
//   res.end();
// };

// export default SocketHandler;
