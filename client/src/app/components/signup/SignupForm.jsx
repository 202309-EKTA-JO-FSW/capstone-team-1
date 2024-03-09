"use client";
import { fetchSignup } from "@/app/lib/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Btn from "../Btn";

const SignupForm = ({ onSignup }) => {
  const formData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "0",
    gender: "",
    phoneNumber: "",
    country: "",
    city: "",
    street: "",
    zipcode: "",
    isAdmin: false,
  };
  const router = useRouter();
  const [form, setForm] = useState(formData);
  const [signupRes, setSignupRes] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // save the user in database
    const signup = await fetchSignup(form);
    setSignupRes(signup);

    // send the signup message to parent component
    onSignup(signup.message);

    // check if there is a user to refresh the page
    if (signup.user) {
      setForm(formData);

      // redirect the user to home page after signup
      router.push("/");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // check if the user signed up succefully to store the details in local storage
  useEffect(() => {
    if (signupRes.user) {
      localStorage.setItem("user", JSON.stringify(signupRes.user));
    }
  }, [signupRes]);

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-[600px] p-7">
      <h1 className="text-4xl font-bold my-10">Create an account</h1>
      <form
        className="flex flex-col justify-center items-center w-full"
        onSubmit={handleSubmit}
      >
        {/* name */}
        <div className="flex justify-between w-full">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-3 mr-4 field"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full p-3 ml-4 field"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        {/* email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 field"
          value={form.email}
          onChange={handleChange}
        />

        {/* password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 field"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-3 field"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <div className="flex justify-between w-full">
          {/* age */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="w-full p-3 mr-4 field"
            value={form.age || "Age"}
            onChange={handleChange}
          />

          {/* gender */}
          <select
            type="text"
            name="gender"
            className="w-full p-3 ml-4 text-gray-700 field"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="gender">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* phone number */}
        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          className="w-full p-3 field"
          value={form.phoneNumber}
          onChange={handleChange}
        />

        {/* address */}
        <div className="flex justify-between w-full">
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="w-full p-3 mr-4 field"
            value={form.country}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full p-3 ml-4 field"
            value={form.city}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between w-full">
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="w-full p-3 mr-4 field"
            value={form.street}
            onChange={handleChange}
          />
          <input
            type="number"
            name="zipcode"
            placeholder="Zip code"
            className="w-full p-3 ml-4 field"
            value={form.zipcode}
            onChange={handleChange}
          />
        </div>
        <div className="mb-8">
          <input
            type="checkbox"
            name="isAdmin"
            onChange={handleChange}
            value={form.isAdmin}
          />
          <label htmlFor="isAdmin">
            {" "}
            Sign up as an owner of the restaurant
          </label>
        </div>
        <Btn type="submit" text={"Sign up"} />
      </form>
    </div>
  );
};

export default SignupForm;
