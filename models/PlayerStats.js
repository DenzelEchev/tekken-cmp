const mongoose = require("mongoose");

const PlayerStatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
    default: "",
  },
  rank: {
    type: Number,
    default: 0,
  },
  sessionCompleted: {
    type: Number,
    default: 0,
  },
  character: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("PlayerStats", PlayerStatsSchema);
