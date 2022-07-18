const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// router.get("/room/:id")
const generateRandomCode = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
router.post("/createroom", async (req, res) => {
  let roomCode = generateRandomCode(6);
  let io = req.app.get("socketio");
  io.emit("NROOM CREATED");
  const room = new Room({
    code: roomCode,
    host: req.body.username,
    users: [
      {
        id: 1235512,
        username: req.body.username,
      },
    ],
  });
  await room.save();
  res.send(room);
});
module.exports = router;
