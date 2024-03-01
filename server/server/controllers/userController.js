const User = require("../models/userModel");
const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found, should login" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateUserProfile = async (req, res) => {
  const userId = req.userId;
  const {
    firstName,
    lastName,
    age,
    gender,
    phoneNumber,
    avatar,
    country,
    city,
    street,
    zipcode,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // get image url
    // uploadImage arguments uploadImage(imagefile, imageFolder in firebase storage)
    let imageUrl;
    if (req.file) {
      // delete the old image and then update the new one
      deleteImage(user.avatar);
      imageUrl = await uploadImage(req.file, "userProfileAvatar");
      if (!imageUrl) {
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }
    // update user
    user.first_name = firstName || user.first_name;
    user.last_name = lastName || user.last_name;
    user.avatar = imageUrl || user.avatar;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.country = country || user.country;
    user.city = city || user.city;
    user.street = street || user.street;
    user.zipcode = zipcode || user.zipcode;
    await user.save();
    res.status(200).json({
      message: "Update user successful",
      results: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { getUserProfile, updateUserProfile };
