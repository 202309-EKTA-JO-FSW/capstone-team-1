const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const passport = require("passport");
const { createToken } = require("./authController");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GAPP_CLIENT_ID,
      clientSecret: process.env.GAPP_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: "no-password",
            provider: profile.provider,
            providerId: profile.id,
            avatar: profile.photos[0].value,
            phoneNumber: "0",
          });
        }

        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// login with google consent
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    const user = req.user;
    if (!user) return res.status(404).json("User not found");
    // create a token
    const token = createToken(user._id);

    // store token in cookie
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    const userInfo = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    };

    const userInfoToken = jwt.sign(userInfo, process.env.SECRET_KEY);
    res.cookie("user", userInfoToken, {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    if (user.phoneNumber === "0") {
      return res.status(200).redirect("http://localhost:3000/signup-info");
    } else {
      return res.status(200).redirect("http://localhost:3000/auth-user");
    }
  }
);

router.get("/me", (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) return res.status(401).send("Invalid User");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function authToken(req, res, next) {
  try {
    const token = req.cookies.user;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "Please login" });
    }

    // decode the token by verify it with secret key we user when token was created
    decodedUser = jwt.verify(token, process.env.SECRET_KEY);

    // send user id
    req.user = decodedUser;

    next();
  } catch (error) {
    console.error(error);
    if (error.message === "invalid signature") {
      return res.status(401).json({ message: "Please login" });
    }
    return res.status(401).json({ message: error.message });
  }
}

module.exports = router;
