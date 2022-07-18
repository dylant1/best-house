const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  code: String,
  host: String,
  users: [
    {
      id: Number,
      username: String,
    },
  ],
});
// store the users nickname and a random id maybe
module.exports = mongoose.model("Room", roomSchema);
