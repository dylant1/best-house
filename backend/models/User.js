const mongoose = require("mongoose");
const nanoid = require("nanoid");
// TODO: make users its own schema
const userSchema = mongoose.Schema({
  username: String,
  id: {
    type: String,
    required: true,
    default: () => nanoid(16),
    index: { unique: true },
  },
  host: Boolean,
});
// store the users nickname and a random id maybe
module.exports = mongoose.model("User", userSchema);
