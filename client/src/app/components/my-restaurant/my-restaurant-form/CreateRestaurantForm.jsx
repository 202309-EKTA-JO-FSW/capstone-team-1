"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AddressField from "../../auth/AddressField";
import Btn from "../../Btn";
import { createRestaurant } from "@/app/lib/data";
import { useAppDispatch } from "@/app/redux/hooks";
import { actionMsg } from "@/app/redux/features/message/MessageSlice";

const CreateRestaurantForm = () => {
  const dispatch = useAppDispatch();
  const formData = {
    name: "",
    cuisine: "",
    description: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    street: "",
    zipcode: "",
  };
  const router = useRouter();
  const [form, setForm] = useState(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // save the user in database
    const restaurant = await createRestaurant(form);
    // update the message state
    dispatch(actionMsg(restaurant.message));
    if (restaurant.results) {
      setForm(formData);
      // update local storage
      const user = JSON.parse(localStorage.getItem("user"));
      const updatedUser = { ...user, restaurant: restaurant.results._id };
      // save user info in  local storage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setForm(formData);
      window.dispatchEvent(new Event("storage"));
      router.push("/my-restaurant");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-start items-center w-full sm:w-[600px] p-7">
      <h1 className="text-4xl font-bold my-10">Create a restaurant</h1>
      <form
        className="flex flex-col justify-center items-center w-full"
        onSubmit={handleSubmit}
      >
        {/* name & cuisine */}
        <div className="flex justify-between w-full">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full mr-4 field"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cuisine"
            placeholder="Cuisine"
            className="w-full ml-4 field"
            value={form.cuisine}
            onChange={handleChange}
          />
        </div>

        {/* description */}
        <textarea
          //   type="text"
          name="description"
          placeholder="Description"
          className="w-full field"
          value={form.description}
          onChange={handleChange}
        />

        {/* email */}
        <input
          type="email"
          name="email"
          placeholder="Restaurant Email"
          className="w-full field"
          value={form.email}
          onChange={handleChange}
        />

        {/* phone number */}
        <input
          type="number"
          name="phoneNumber"
          placeholder="Restaurant Phone Number"
          className="w-full field"
          value={form.phoneNumber}
          onChange={handleChange}
        />

        {/* address */}
        <AddressField setForm={setForm} />

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

        <Btn type="submit" text={"Create"} />
      </form>
    </div>
  );
};

export default CreateRestaurantForm;
