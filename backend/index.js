const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 8080;

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on("connection", (socket) => {
  /* socket object may be used to send specific messages to the new connected client */

  console.log("new client connected");
});
