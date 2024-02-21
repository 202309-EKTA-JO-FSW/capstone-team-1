const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    age,
    gender,
    phoneNumber,
    avatar,
    country,
    city,
    street,
    zipcode,
    isAdmin,
  } = req.body;

  try {
    // validate email & password
    validateEmailAndPassword(email, password);

    const userExist = await User.findOne({ email });

    // check if email exist
    if (userExist)
      return res.status(409).json({ message: "Email already exists" });

    // check if the password and confirmPassword match
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password does not match" });

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // store the user in database
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      age,
      gender,
      phone_number: phoneNumber,
      avatar,
      isAdmin,
      address: {
        country,
        city,
        street,
        zipcode,
      },
    });

    // create a token
    const token = createToken(user._id);

    // send token with user details
    return res.status(200).json({
      user: {
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    // checking if the it's validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

// function to create a token
function createToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: 1000 * 1000 });
}

// validate email and password
function validateEmailAndPassword(email, password) {
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
}

module.exports = { signup };
