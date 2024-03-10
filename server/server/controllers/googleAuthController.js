const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GAPP_CLIENT_ID,
      clientSecret: process.env.GAPP_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      const user = User.findOne({ email: profile.emails[0].value });
      if (!user) {
        User.create(
          {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: "",
            provider: profile.provider,
            providerId: profile.id,
            age: "",
            gender: "",
            avatar: profile.photos[0].value,
            phoneNumber: "",
          },
          function (err, user) {
            return cb(err, user);
          }
        );
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // store the id in session
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // return the user's data according to the id
  const user = await User.findById(id);
  done(null, user);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email", "openid"] }),
  (req, res) => {
    res.send("test");
    res.end();
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }, (req, res) => {
    console.log(req.user);
  })
);

module.exports = router;
