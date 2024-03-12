const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationSignup } = require("../utils/validation");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if the user entered both fields
    if (!email || !password)
      return res.status(400).json({ message: "All fields must be filled" });

    const user = await User.findOne({ email });

    // check if the email match
    if (!user)
      return res.status(401).json({ message: "Incorrect email or password" });

    // check if the password match
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res.status(401).json({ message: "Incorrect email or password" });

    // create a token
    const token = createToken(user._id);

    // store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    // send token with user details
    return res.status(201).json({
      user: {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      },
      message: "Login successful",
    });
  } catch (error) {
    // checking if the it's validation error
    if (error.name === "ValidationError") {
      console.error(error);
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

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
    country,
    city,
    street,
    zipcode,
    isAdmin,
  } = req.body;

  try {
    // validate signup field
    validationSignup(req.body);

    // looking up for user
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
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      gender,
      phoneNumber,
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

    // store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    // send token with user details
    return res.status(201).json({
      user: {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      },
      message: "Signup successful",
    });
  } catch (error) {
    // checking if the it's validation error
    if (error.name === "ValidationError") {
      console.error(error);
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// logout
const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // checking if the it's validation error
    if (error.name === "ValidationError") {
      console.error(error);
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// function to create a token
function createToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY);
}

module.exports = { signup, login, logout, createToken };
