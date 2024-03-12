const Cookies = require("js-cookie");
const { signupUrl, loginUrl, getGoogleUser, googleMeUrl } = require("./utils");

const fetchResturants = async () => {
  try {
  } catch (error) {}
};

// signup
export const fetchSignup = async (form) => {
  try {
    const res = await fetch(signupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// login
export const fetchLogin = async (form) => {
  try {
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

// google auth
export const fetchGoogleUser = async () => {
  try {
    const token = Cookies.get("user");
    // console.log("token here");
    // console.log(token);
    const res = await fetch(getGoogleUser, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};
