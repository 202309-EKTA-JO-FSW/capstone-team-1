const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Please login" });
    }

    // get token
    const token = authorization.split(" ")[1];

    // decode the token by verify it with secret key we user when token was created
    decodedUser = jwt.verify(token, process.env.SECRET_KEY);

    // send user id
    req.userId = decodedUser.id;
  

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = authUser;
