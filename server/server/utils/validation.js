const validator = require("validator");

// validate signup feild
const validationSignup = (body) => {
  if (!body.firstName) {
    throw Error("First Name is required");
  } else if (!body.lastName) {
    throw Error("Last Name is required");
  } else if (!body.age) {
    throw Error("Age is required");
  } else if (!body.gender) {
    throw Error("Gender is required");
  } else if (!body.phoneNumber) {
    throw Error("Gender is required");
  }
};

// validate email and password
const validateEmailAndPassword = (email, password) => {
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

module.exports = { validationSignup, validateEmailAndPassword };
