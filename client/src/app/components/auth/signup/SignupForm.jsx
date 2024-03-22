"use client";
import { fetchSignup } from "@/app/lib/data";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Btn from "../../Btn";
import AddressField from "../AddressField";
import { useAppDispatch } from "@/app/redux/hooks";
import { actionMsg } from "@/app/redux/features/message/MessageSlice";

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const formData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    country: "",
    city: "",
    street: "",
    zipcode: "",
    isAdmin: false,
  };
  const router = useRouter();
  const [form, setForm] = useState(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // save the user in database
    const signup = await fetchSignup(form);

    // set the message
    dispatch(actionMsg(signup.message));

    // check if there is a user to refresh the page
    if (signup.user) {
      // save user info in local storage
      localStorage.setItem("user", JSON.stringify(signup.user));
      setForm(formData);
      window.dispatchEvent(new Event("storage"));
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

  // Callback function to handle country change
  const handleCountryChange = (selectedCountry) => {
    setForm((prevState) => ({
      ...prevState,
      country: selectedCountry.label, // Set country value
      city: "", // Reset city when changing country
    }));
  };

  // Callback function to handle city change
  const handleCityChange = (selectedCity) => {
    setForm((prevState) => ({
      ...prevState,
      city: selectedCity, // Set city value
    }));
  };

  return (
    <div className="flex flex-col justify-start items-center w-full sm:w-[600px] p-7">
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
            className="w-full mr-4 field"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full ml-4 field"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        {/* email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full field"
          value={form.email}
          onChange={handleChange}
        />

        {/* password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full field"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full field"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {/* phone number */}
        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          className="w-full field"
          value={form.phoneNumber}
          onChange={handleChange}
        />

        {/* address */}
        {/* <div className="flex justify-between w-full">
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="w-full mr-4 field"
            value={form.country}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full ml-4 field"
            value={form.city}
            onChange={handleChange}
          />
        </div> */}
        {/* address new */}
        <AddressField
          // Pass callbacks to handle country and city changes
          onCountryChange={handleCountryChange}
          onCityChange={handleCityChange}
        />

        <div className="flex justify-between w-full">
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="w-full mr-4 field"
            value={form.street}
            onChange={handleChange}
          />
          <input
            type="number"
            name="zipcode"
            placeholder="Zip code"
            className="w-full ml-4 field"
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
