// import { Server } from "socket.io";
// import { createServer } from "http";

// const httpServer = createServer();

// const wsServer = new Server(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });

// let activeUsers = 0;

// wsServer.on("connection", (socket) => {
//   activeUsers++;
//   console.log(`User connected. Active users: ${activeUsers}`);

//   wsServer.emit("activeUsers", activeUsers);

//   socket.on("disconnect", () => {
//     activeUsers--;
//     console.log(`User disconnected. Active users: ${activeUsers}`);
//     wsServer.emit("activeUsers", activeUsers);
//   });
// });

// httpServer.listen(process.env.PORT || 3000);

import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

// const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  let activeUsers = 0;

  wsServer.on("connection", (socket) => {
    activeUsers++;
    console.log(`User connected. Active users: ${activeUsers}`);

    io.emit("activeUsers", activeUsers);

    socket.on("disconnect", () => {
      activeUsers--;
      console.log(`User disconnected. Active users: ${activeUsers}`);
      io.emit("activeUsers", activeUsers);
    });

    httpServer
      .once("error", (err) => {
        console.error(err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
  });
});
