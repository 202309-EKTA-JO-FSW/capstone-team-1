"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Btn from "../../Btn";

const SignupInfoForm = () => {
  const formData = {
    phoneNumber: "",
    country: "",
    city: "",
    street: "",
    zipcode: "",
    isAdmin: false,
  };
  const router = useRouter();
  const [form, setForm] = useState(formData);
  const handleSubmit = () => {};
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
    <div className="flex flex-col justify-start items-center w-full sm:w-[600px] p-7">
      <h1 className="text-4xl font-bold my-10">Continue Sign Up</h1>
      <form
        className="flex flex-col justify-center items-center w-full"
        onSubmit={handleSubmit}
      >
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
        <div className="flex justify-between w-full">
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
        </div>
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
        <Btn type="submit" text={"Done"} />
      </form>
    </div>
  );
};

export default SignupInfoForm;
