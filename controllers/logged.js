const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getFeed: async (req, res) => {
    try {
      res.render('training.njk');
    } catch (err) {
      console.log(err);
    }
  },

  updateRank: async (req, res) => {
    const { completed, failed } = req.body;

    try {
      const { userName } = req.user; // Assuming the username is available in the request object

      const user = await User.findOne({ userName });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update the rank based on completed and failed sessions
      user.rank += completed - failed;
      await user.save(); // Save the updated user back to the database

      res.status(200).json({ message: 'Rank updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating rank' });
    }
  },
};
