require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = require("express")();
const server = require("http").createServer(app);
const routes = require("./routes/routes");
const Room = require("./models/Room");

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const PORT = 8080;

mongoose
  .connect(process.env.CONNECTION_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("conencted to db");
  });
app.use(cors());
app.use(express.json());
app.use("/", routes);
app.set("socketio", io);
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on("connection", (socket) => {
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  socket.on("createroom", (data) => {
    socket.join(data.code);

    console.log(`${data.username} JOINED THE ROOM`);
    console.log(data.code);
    const room = new Room({
      code: data.code,
      host: data.username,
      users: [
        {
          username: data.username,
          host: true,
        },
      ],
    });
    try {
      room.save();
    } catch (err) {
      console.log(err);
    }
    // io.to(data.code).emit("LODSTER JOINED THE ROOM");
    io.sockets.in(data.code).emit("roomCreated", room);
    // io.to(data.code).emit("roomC");
  });
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------
  socket.on("joinroom", (data) => {
    try {
      let update = { username: data.username, host: false };
      Room.findOneAndUpdate(
        { code: data.code },
        {
          $push: {
            users: update,
          },
        },
        {
          returnOriginal: false,
        },
        (err, room) => {
          if (err) console.log(err);
          console.log(room);
          socket.join(room.code);
          io.sockets.in(room.code).emit("newUser", room);
          //   io.to(data.code).emit("room cretaed");
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("gameStarted", (data) => {
    let code = data.code;
    io.sockets.in(code).emit("redirect", { code: data.code });
  });
});
