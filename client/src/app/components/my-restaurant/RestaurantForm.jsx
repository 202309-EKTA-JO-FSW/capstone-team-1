"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Btn from "../Btn";
import { createRestaurant, updateAdminRestaurant } from "@/app/lib/data";

function RestaurantForm({ restaurantData }) {
  const initialFormData = {
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

  const [form, setForm] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    console.log(restaurantData);
    if (restaurantData) {
      setEdit(true);
      const {
        name,
        description,
        cuisine,
        contact: { phoneNumber } = {},
        address: { country, city, street, zipcode } = {},
      } = restaurantData;

      setForm({
        name: name || "",
        description: description || "",
        cuisine: cuisine || "",
        phoneNumber: phoneNumber || "",
        country: country || "",
        city: city || "",
        street: street || "",
        zipcode: zipcode || "",
      });
    }
  }, [restaurantData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (edit === false) {
      try {
        console.log(form.image);
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("cuisine", form.cuisine);
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("country", form.country);
        formData.append("city", form.city);
        formData.append("street", form.street);
        formData.append("zipcode", form.zipcode);
        formData.append("image", file); // Append the image file to the form data

        console.log("Form Data:", formData);
        console.log(form);
        const res = await createRestaurant(formData); // Pass the formData object to your API function
        console.log("Response:", res.restaurant);
      } catch (error) {
        console.error("Error creating restaurant:", error);
      } finally {
        setLoading(true);
        setEdit(true);
      }
    } else {
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
    const fileImg = e.target.files[0];
    setFile(fileImg);
    setForm((prevForm) => ({
      ...prevForm,
      image: fileImg || null, // Store the selected image file
      imageUrl: URL.createObjectURL(fileImg) || null, // Generate a preview URL for the selected image
    }));
  };
  const updateRestaurant = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-[700px] p-2">
      <h1 className="text-4xl font-bold my-3">
        {" "}
        {edit ? "Restaurant Profile" : "Create Restaurant"}
      </h1>
      <div className="flex flex-col justify-around w-full ">
        <form
          className="flex flex-col justify-center items-center w-full "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-around w-full">
            <div className="flex flex-col  p-2">
              <span className=" h-[150px]  w-[170px] flex justify-center rounded   border border-gray-300">
                {form.imageUrl && (
                  <Image
                    src={form.imageUrl}
                    width={100}
                    height={100}
                    alt="Selected Image Preview"
                    className="rounded"
                    priority="true"
                    style={{ width: "auto", height: "auto" }}
                  />
                )}
              </span>
              <input
                type="file"
                accept="image/*"
                filename={file}
                onChange={handleImageChange}
                disabled={edit} // Disable the field if not in edit mode
              />
            </div>
            <input
              className="w-full field mb-4"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Restaurant Name"
              disabled={edit}
            />
            <textarea
              className="w-full field mb-4"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              disabled={edit}
            />
            <input
              className="w-full field mb-4"
              type="text"
              name="cuisine"
              value={form.cuisine}
              onChange={handleChange}
              placeholder="Cuisine"
              disabled={edit}
            />
            <input
              type="number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full field mb-4"
              disabled={edit}
            />
            {/* address */}
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="w-full field mb-4"
              value={form.country}
              onChange={handleChange}
              disabled={edit}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full field mb-4"
              value={form.city}
              onChange={handleChange}
              disabled={edit}
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              className="w-full field mb-4"
              value={form.street}
              onChange={handleChange}
              disabled={edit}
            />
            <input
              type="number"
              name="zipcode"
              placeholder="Zip code"
              className="w-full field"
              value={form.zipcode}
              onChange={handleChange}
              disabled={edit}
            />
          </div>
          {!edit && <Btn text="Create" />}
        </form>
      </div>
    </div>
  );
}

export default RestaurantForm;
