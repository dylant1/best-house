const mongoose = require("mongoose");
const nanoid = require("nanoid");
// TODO: make users its own schema
const roomSchema = mongoose.Schema({
  code: String,
  host: String,
  users: [
    {
      id: {
        type: String,
        required: true,
        default: () => nanoid(16),
        index: { unique: true },
      },
      username: String,
      host: Boolean,
    },
  ],
});
// store the users nickname and a random id maybe
module.exports = mongoose.model("Room", roomSchema);
