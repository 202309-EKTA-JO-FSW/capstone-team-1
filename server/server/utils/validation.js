const validator = require("validator");

// validate signup fields
const validationSignup = (body) => {
  if (!body.firstName) {
    throw Error("First Name is required");
  } else if (!body.lastName) {
    throw Error("Last Name is required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  } else if (!body.phoneNumber) {
    throw Error("Phone Number is required");
  }
};

// validate restaurant fields
const validateRestaurant = (body) => {
  if (!body.name) {
    throw Error("Name is required");
  } else if (!body.description) {
    throw Error("Description is required");
  } else if (!body.cuisine) {
    throw Error("Cuisine is required");
  }
};

module.exports = {
  validationSignup,
  validateRestaurant,
};
