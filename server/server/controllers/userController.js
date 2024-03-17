const User = require("../models/userModel");
const { uploadImage, deleteImage } = require("../utils/images/imageStorage");

// get user profile
const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "User not found, please login" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update user profile
const updateUserProfile = async (req, res) => {
  const userId = req.userId;
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    isAdmin,
    country,
    city,
    street,
    zipcode,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found, please login" });
    }

    // get image url
    // uploadImage arguments uploadImage(imagefile, imageFolder in firebase storage)
    let imageUrl;
    if (req.file) {
      // delete the old image and then update the new one
      if (user.avatar) deleteImage(user.avatar);
      imageUrl = await uploadImage(req.file, "userProfileAvatar");
      if (!imageUrl) {
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    // update user
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.password = password || user.password;
    user.avatar = imageUrl || user.avatar;
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    if (!user.address) {
      user.address = {};
    }

    user.address.country = country || user.address.country;
    user.address.city = city || user.address.city;
    user.address.street = street || user.address.street;
    user.address.zipcode = zipcode || user.address.zipcode;

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
