"use client";

import { useState } from "react";

const SignupForm = () => {
  const formData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "age",
    gender: "",
    phoneNumber: "",
    country: "",
    city: "",
    street: "",
    zipcode: "",
    isAdmin: false,
  };
  const [form, setForm] = useState(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setForm(formData);
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
            value={form.age}
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
        <button
          type="submit"
          className="bg-main-green py-3 px-8 rounded-3xl text-white text-sm hover:bg-opacity-75"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
