const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  mark: {
    type: Number,
    required: true,
  },
  userid: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Students", userSchema);
