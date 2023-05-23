const PlayerStats = require("../models/PlayerStats");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      res.render("profile.njk", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      res.render("training.njk");
    } catch (err) {
      console.log(err);
    }
  },


  updateRank: async (req, res) => {
    const { completed, failed } = req.body;
  
    try {
      const { userName } = req.user;
  
      const user = await User.findOne({ userName });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      user.rank += completed - failed;
      user.sessionCompleted + 1
      await user.save();
  
      let playerStats = await PlayerStats.findOne({ user: user._id });
  
      if (playerStats) {
        // If playerStats document exists, update the rank and sessionCompleted ONLY
        playerStats.rank = user.rank;
        playerStats.sessionCompleted += completed;
        await playerStats.save();
      } else {
        // If playerStats document doesn't exist, create a new one
        playerStats = new PlayerStats({
          user: user._id,
          userName: user.userName,
          rank: user.rank,
          sessionCompleted: completed,
          character: user.character
        });
        await playerStats.save();
      }
  
      res.status(200).json({ message: "Rank updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating rank" });
    }
  }
};
