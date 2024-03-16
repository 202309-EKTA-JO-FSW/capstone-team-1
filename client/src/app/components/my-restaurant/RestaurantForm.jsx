"use client";
import React, { useState } from "react";
import Image from "next/image";
import { createRestaurant } from "@/app/lib/data";
import Btn from "../Btn";
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
    image: null,
  };
  const [form, setForm] = useState(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       console.log(form.image);
      // const formData = new FormData();
      // formData.append("name", form.name);
      // formData.append("description", form.description);
      // formData.append("cuisine", form.cuisine);
      // formData.append("phoneNumber", form.phoneNumber);
      // formData.append("country", form.country);
      // formData.append("city", form.city);
      // formData.append("street", form.street);
      // formData.append("zipcode", form.zipcode);
      // formData.append("image", form.image); // Append the image file to the form data

     // console.log("Form Data:", formData); */

      const res = await createRestaurant(form); // Pass the formData object to your API function
      console.log("Response:", res.restaurant);
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prevForm) => ({
      ...prevForm,
      image: file, // Store the selected image file
      //imageUrl: URL.createObjectURL(file), // Generate a preview URL for the selected image
    }));
  };
  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-[600px] p-6">
      <h1 className="text-4xl font-bold my-10">Create Restaurant</h1>
      <form
        className="flex flex-col justify-center items-center w-full "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full ">
          <span className="p-7">
            {form.imageUrl && (
              <Image
                src={form.imageUrl}
                width={100}
                height={100}
                alt="Selected Image Preview"
              />
            )}

            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
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
        <Btn text={"Create"} />
      </form>
    </div>
  );
}

export default RestaurantForm;
