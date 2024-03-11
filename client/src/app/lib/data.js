const { signupUrl, loginUrl, googleAuthUrl, googleMeUrl } = require("./utils");

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
export const fetchGoogleAuth = async () => {
  try {
    const res = await fetch(googleMeUrl);

    return res.json();
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};
