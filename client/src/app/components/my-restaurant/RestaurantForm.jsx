"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Btn from "../Btn";
import { FiEdit } from "react-icons/fi";
import { updateAdminRestaurant } from "@/app/lib/data";
import restaurantPlaceHolderImg from "../../../../public/image/restaurant-placeholder.png";
import AddressField from "../auth/AddressField";
import { useAppDispatch } from "@/app/redux/hooks";
import { actionMsg } from "@/app/redux/features/message/MessageSlice";

function RestaurantForm({ restaurantData, setRestaurantData }) {
  const dispatch = useAppDispatch();
  // Define initial form state
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
  const [showUpdateButton, setShowUpdateButton] = useState(false); // State to manage the visibility of the Update button

  // Update form data when restaurantData changes
  useEffect(() => {
    if (restaurantData) {
      setForm({
        name: restaurantData.name || "",
        description: restaurantData.description || "",
        cuisine: restaurantData.cuisine || "",
        imageUrl: restaurantData.image,
        phoneNumber: restaurantData.contact.phoneNumber || "",
        country: restaurantData.address.country || "",
        city: restaurantData.address.city || "",
        street: restaurantData.address.street || "",
        zipcode: restaurantData.address.zipcode || "",
      });
      setEdit(false);
    }
  }, [restaurantData]);

  // function to cancel user updates
  const cancelUpdates = () => {
    if (restaurantData) {
      setForm({
        name: restaurantData.name || "",
        description: restaurantData.description || "",
        cuisine: restaurantData.cuisine || "",
        imageUrl: restaurantData.image,
        phoneNumber: restaurantData.contact.phoneNumber || "",
        country: restaurantData.address.country || "",
        city: restaurantData.address.city || "",
        street: restaurantData.address.street || "",
        zipcode: restaurantData.address.zipcode || "",
      });
    }
    setEdit((prev) => !prev);
    setShowUpdateButton((prev) => !prev);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        ...form,
        image: file,
      };

      const formDataToAppend = new FormData();

      for (const key in formData) {
        formDataToAppend.append(key, formData[key]);
      }

      const res = await updateAdminRestaurant(formDataToAppend);
      // update the message state
      dispatch(actionMsg(res.message));
      setRestaurantData(res.results); // Update the state with updated data

      if (res) {
        setLoading(false);
        setEdit((prev) => !prev);
        setShowUpdateButton((prev) => !prev);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  // Function to handle image change
  const handleImageChange = (e) => {
    const fileImg = e.target.files[0];
    setFile(fileImg);
    setForm((prevForm) => ({
      ...prevForm,
      image: fileImg || null, // Store the selected image file
      imageUrl: URL.createObjectURL(fileImg) || null, // Generate a preview URL for the selected image
    }));
  };
  // Function to toggle edit mode
  const toggleEdit = () => {
    setEdit((prevEdit) => !prevEdit);
    setShowUpdateButton(true);
  };

  return (
    <div className="flex relative flex-col justify-center items-center w-full p-2">
      <h1 className="text-4xl font-bold my-3">Restaurant Profile</h1>
      <div className="flex flex-col justify-around w-full ">
        <form
          className="flex flex-col justify-center items-center w-full "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-around w-full">
            <div className="flex flex-col p-1">
              <span className=" h-[160px]  w-[200px] flex justify-center border border-gray-300">
                {
                  <Image
                    src={form.imageUrl || restaurantPlaceHolderImg}
                    width={200}
                    height={160}
                    alt="Selected Image Preview"
                    priority={true}
                    className="w-auto h-auto rounded"
                  />
                }
              </span>
              {edit && (
                <input
                  type="file"
                  accept="image/*"
                  filename={file}
                  onChange={handleImageChange}
                  className="mt-4"
                />
              )}
            </div>
            <section className="flex justify-end p-2 cursor-pointer hover:text-main-green">
              <FiEdit className="text-2xl" onClick={toggleEdit} />
            </section>
            <input
              className="w-full field mb-4"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Restaurant Name"
              disabled={!edit}
            />
            <textarea
              className="w-full field mb-4"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              disabled={!edit}
            />
            <input
              className="w-full field mb-4"
              type="text"
              name="cuisine"
              value={form.cuisine}
              onChange={handleChange}
              placeholder="Cuisine"
              disabled={!edit}
            />
            <input
              type="number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full field mb-4"
              disabled={!edit}
            />
            {/* address */}
            {!edit && (
              <div className="flex items-center justify-between w-full">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="w-full mr-4 field"
                  value={form.country}
                  onChange={handleChange}
                  disabled={!edit}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full field"
                  value={form.city}
                  onChange={handleChange}
                  disabled={!edit}
                />
              </div>
            )}
            {edit && <AddressField setForm={setForm} />}
            <div className="flex justify-between w-full">
              <input
                type="text"
                name="street"
                placeholder="Street"
                className="w-full mr-4 field"
                value={form.street}
                onChange={handleChange}
                disabled={!edit}
              />
              <input
                type="number"
                name="zipcode"
                placeholder="Zip code"
                className="w-full field"
                value={form.zipcode}
                onChange={handleChange}
                disabled={!edit}
              />
            </div>
          </div>
          {showUpdateButton && (
            <div className="flex gap-4">
              <Btn text="Update" loadingBtn={loading} />
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
        </form>
      </div>
    </div>
  );
}

export default RestaurantForm;
