const validator = require("validator");

// validate signup fields
const validationSignup = (body) => {
  if (!body.firstName) {
    throw Error("First Name is required");
  } else if (!body.lastName) {
    throw Error("Last Name is required");
  } else if (!validator.isEmail(body.email)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(body.password)) {
    throw new Error("Password is not strong enough");
  } else if (!body.phoneNumber) {
    throw Error("Phone Number is required");
  } else if (!body.country) {
    throw Error("Country is required");
  } else if (!body.city) {
    throw Error("City is required");
  } else if (!body.street) {
    throw Error("Street is required");
  } else if (!body.zipcode) {
    throw Error("Zipcode is required");
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
