"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Btn from "../Btn";
import { FiEdit } from "react-icons/fi";
import { createRestaurant, updateAdminRestaurant } from "@/app/lib/data";

function RestaurantForm({ restaurantData, setRestaurantData }) {
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
  const [disable, setDisable] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false); // State to manage the visibility of the Update button
  const [hasRestaurant, setHasRestaurant] = useState(false);

  useEffect(() => {
    if (restaurantData && Object.keys(restaurantData).length > 0) {
      console.log(restaurantData);
      const {
        name,
        description,
        cuisine,
        image,
        contact: { phoneNumber } = {},
        address: { country, city, street, zipcode } = {},
      } = restaurantData;

      setForm({
        name: name || "",
        description: description || "",
        cuisine: cuisine || "",
        imageUrl: image,
        phoneNumber: phoneNumber || "",
        country: country || "",
        city: city || "",
        street: street || "",
        zipcode: zipcode || "",
      });
      setHasRestaurant(true);
      setDisable(true);
    } else {
      setHasRestaurant(false);
      console.log("edit not has res", hasRestaurant);
    }
  }, [restaurantData]);

  const cancelUpdates = () => {
    if (restaurantData) {
      const {
        name,
        description,
        cuisine,
        image,
        contact: { phoneNumber } = {},
        address: { country, city, street, zipcode } = {},
      } = restaurantData;

      setForm({
        name: name || "",
        description: description || "",
        cuisine: cuisine || "",
        imageUrl: image,
        phoneNumber: phoneNumber || "",
        country: country || "",
        city: city || "",
        street: street || "",
        zipcode: zipcode || "",
      });
    }
    setEdit((prev) => !prev);
    setShowUpdateButton((prev) => !prev);
    setDisable(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        name: form.name,
        description: form.description,
        cuisine: form.cuisine,
        phoneNumber: form.phoneNumber,
        country: form.country,
        city: form.city,
        street: form.street,
        zipcode: form.zipcode,
        image: file,
      };

      const formDataToAppend = new FormData();

      for (const key in formData) {
        formDataToAppend.append(key, formData[key]);
      }

      if (!edit) {
        const res = await createRestaurant(formDataToAppend);
        setRestaurantData(res.restaurant); // Update the state with new data
        setHasRestaurant(true);
      } else {
        const res = await updateAdminRestaurant(formDataToAppend);
        setRestaurantData(res.results); // Update the state with updated data
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setEdit(false);
      setDisable(true);

      setShowUpdateButton(false);
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

  const toggleFieldsDisabled = () => {
    setEdit((prev) => !prev);
    setHasRestaurant(true);
    setShowUpdateButton((prev) => !prev);
    setDisable(false);
  };
  const getTitle = () => {
    if (loading) {
      return "Loading...";
    } else if (hasRestaurant) {
      return "Restaurant Profile";
    } else {
      return "Create Restaurant";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-2">
      <h1 className="text-4xl font-bold my-3">{getTitle()}</h1>
      <div className="flex flex-col justify-around w-full ">
        <form
          className="flex flex-col justify-center items-center w-full "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-around w-full">
            <div className="flex flex-col p-1">
              <span className=" h-[160px]  w-[200px] flex justify-center border border-gray-300">
                {form.imageUrl && (
                  <Image
                    src={form.imageUrl}
                    width={200}
                    height={160}
                    alt="Selected Image Preview"
                    priority="true"
                    className="w-auto h-auto rounded"
                  />
                )}
              </span>
              {(!hasRestaurant || edit) && (
                <input
                  type="file"
                  accept="image/*"
                  filename={file}
                  onChange={handleImageChange}
                  className="mt-4"
                />
              )}
            </div>
            {hasRestaurant && (
              /*  <button
                className="flex justify-end p-2 "
                onClick={toggleFieldsDisabled}
                type="button"
              > */
              <section className="flex justify-end p-2 cursor-pointer hover:text-main-green">
                <FiEdit className="text-2xl " onClick={toggleFieldsDisabled} />
              </section>
              //  </button>
            )}
            <input
              className="w-full field mb-4"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Restaurant Name"
              disabled={disable}
            />
            <textarea
              className="w-full field mb-4"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              disabled={disable}
            />
            <input
              className="w-full field mb-4"
              type="text"
              name="cuisine"
              value={form.cuisine}
              onChange={handleChange}
              placeholder="Cuisine"
              disabled={disable}
            />
            <input
              type="number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full field mb-4"
              disabled={disable}
            />
            {/* address */}
            <div className="flex items-center justify-between w-full">
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="w-full mr-4 field"
                value={form.country}
                onChange={handleChange}
                disabled={disable}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full field"
                value={form.city}
                onChange={handleChange}
                disabled={disable}
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
                disabled={disable}
              />
              <input
                type="number"
                name="zipcode"
                placeholder="Zip code"
                className="w-full field"
                value={form.zipcode}
                onChange={handleChange}
                disabled={disable}
              />
            </div>
          </div>
          {!loading && showUpdateButton && (
            <div className="flex gap-4">
              <Btn text="Update" />
              <button
                className="bg-main-green py-3 px-8 rounded-3xl text-white text-sm hover:bg-opacity-75"
                type="button"
                text="Cancel"
                onClick={cancelUpdates}
              >
                Cancel
              </button>
            </div>
          )}
          {!loading && !hasRestaurant && !showUpdateButton && (
            <Btn text="Create" />
          )}
        </form>
      </div>
    </div>
  );
}

export default RestaurantForm;
