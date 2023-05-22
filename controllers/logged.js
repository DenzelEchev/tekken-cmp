const Post = require("../models/Post");

exports.updateRank = async (req, res) => {
  const { completed, failed } = req.body;

  try {
    const { userName } = req.user;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    user.rank += completed - failed;
    await user.save(); 

    res.status(200).json({ message: 'Rank updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating rank' });
  }
};