const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const passport = require("passport");
const { createToken } = require("./authController");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).redirect("http://localhost:3000");
  }
);

module.exports = router;
