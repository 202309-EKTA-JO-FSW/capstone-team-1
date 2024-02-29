const User = require("../models/userModel");
const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found, should login" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Update user successful",
      results: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { getUserProfile, updateUserProfile };
