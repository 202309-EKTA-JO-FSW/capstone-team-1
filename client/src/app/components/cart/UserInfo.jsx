"use client";
import { fetchUser } from "@/app/lib/data";
import React, { useEffect, useState } from "react";

const UserInfo = ({ loading, cart, form, setForm }) => {
  // form data
  // const [form, setForm] = useState({
  //   phoneNumber: "",
  //   country: "",
  //   city: "",
  //   street: "",
  //   zipcode: "",
  // });

  useEffect(() => {
    // Function to fetch user data and update the form state
    const getUserData = async () => {
      try {
        const user = await fetchUser();

        // set the form user details
        if (user) {
          setForm({
            phoneNumber: user.phoneNumber || "",
            country: user.address ? user.address.country : "",
            city: user.address ? user.address.city : "",
            street: user.address ? user.address.street : "",
            zipcode: user.address ? user.address.zipcode : "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the function to fetch user data
    getUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // return nothing untill the cart component loads
  if (loading || cart.length === 0) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full md:p-10">
      <h1 className="text-3xl font-bold mb-7">Your Information: </h1>
      <form className="w-full">
        {/* phone number */}
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone number"
          className="w-full field-cart"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        {/* address */}
        <div className="flex justify-between w-full">
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="w-full mr-4 field-cart"
            value={form.country}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full ml-4 field-cart"
            value={form.city}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between w-full">
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="w-full mr-4 field-cart"
            value={form.street}
            onChange={handleChange}
          />
          <input
            type="number"
            name="zipcode"
            placeholder="Zip code"
            className="w-full ml-4 field-cart"
            value={form.zipcode}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
