"use client";
import React, { useState } from "react";
import Image from "next/image";

function RestaurantForm() {
  const formData = {
    name: "",
    description: "",
    cuisine: "",
    phoneNumber: "",
    country: "",
    city: "",
    street: "",
    zipcode: "",
  };
  const [form, setForm] = useState(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col justify-start items-center w-full sm:w-[600px] p-7">
      <h1 className="text-4xl font-bold my-10">Create Restaurant</h1>
      <form
        className="flex flex-col justify-center items-center w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full">
          <span>
            <Image></Image>
          </span>
          <input
            className="w-full field mb-4"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Restaurant Name"
            required
          />
          <textarea
            className="w-full field mb-4"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            className="w-full field mb-4"
            type="text"
            name="cuisine"
            value={form.cuisine}
            onChange={handleChange}
            placeholder="Cuisine"
            required
          />
          <input
            type="number"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full field mb-4"
            required
          />
          {/* address */}
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="w-full field mb-4"
            value={form.country}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full field mb-4"
            value={form.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="w-full field mb-4"
            value={form.street}
            onChange={handleChange}
          />
          <input
            type="number"
            name="zipcode"
            placeholder="Zip code"
            className="w-full field"
            value={form.zipcode}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}

export default RestaurantForm;
