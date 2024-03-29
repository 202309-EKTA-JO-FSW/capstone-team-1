"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Btn from "../../Btn";
import { fetchUserUpdate } from "@/app/lib/data";
import AddressField from "../AddressField";
import { useAppDispatch } from "@/app/redux/hooks";
import { actionMsg } from "@/app/redux/features/message/MessageSlice";

const SignupInfoForm = () => {
  const dispatch = useAppDispatch();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let signup;
    if (form.phoneNumber && form.country && form.street && form.zipcode) {
      signup = await fetchUserUpdate(form);
      // update the message state
      dispatch(actionMsg(signup.message));
    } else {
      dispatch(actionMsg("All field must be filled"));
    }

    const userInfo = {
      email: signup.results.email,
      firstName: signup.results.firstName,
      lastName: signup.results.lastName,
      avatar: signup.results.avatar,
      isAdmin: signup.results.isAdmin,
      restaurant: signup.results.restaurant,
      country: signup.results.address.country,
      city: signup.results.address.city,
    };
    // check if there is a user to refresh the page
    if (signup) {
      localStorage.setItem("user", JSON.stringify(userInfo));
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
        <div className="mb-8">
          <input
            type="checkbox"
            name="isAdmin"
            onChange={handleChange}
            checked={form.isAdmin}
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
