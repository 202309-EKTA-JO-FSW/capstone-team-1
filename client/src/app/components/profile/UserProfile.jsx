"use client";
import React, { useEffect, useState } from "react";
import { fetchUser, fetchUserUpdateImg } from "@/app/lib/data";
import Btn from "@/app/components/Btn";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import AvatarImg from "../../../../public/Avatar-Profile-Image.png";
import Loading from "../loading/Loading";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hooks";
import { actionMsg } from "@/app/redux/features/message/MessageSlice";
import avatarPlaceHolder from "../../../../public/Avatar-Profile-Image.png";
import AddressField from "../auth/AddressField";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    country: "",
    zipcode: 0,
    avatar: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(AvatarImg);
  const [disable, setDisable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const getUserInfo = async () => {
    try {
      setIsLoading(true);
      const user = await fetchUser();

      if (user) {
        setForm({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          avatar: user.avatar,
          street: user.address.street,
          city: user.address.city,
          zipcode: user.address.zipcode,
          country: user.address.country,
        });
        setIsLoading(false);
        setDisable(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Call the function to fetch user data
    getUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImgChange = (e) => {
    const fileImg = e.target.files[0];
    setFile(fileImg);
    setForm((prevForm) => ({
      ...prevForm,
      avatar: fileImg || null, // Store the selected image file
      avatar: URL.createObjectURL(fileImg) || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("street", form.street);
      formData.append("city", form.city);
      formData.append("country", form.country);
      formData.append("zipcode", form.zipcode);

      const editUser = await fetchUserUpdateImg(formData);
      // update the message state
      dispatch(actionMsg(editUser.message));
      const updatedUser = await fetchUser();
      if (updatedUser) {
        setForm({
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phoneNumber: updatedUser.phoneNumber,
          avatar: updatedUser.avatar,
          street: updatedUser.address.street,
          city: updatedUser.address.city,
          zipcode: updatedUser.address.zipcode,
          country: updatedUser.address.country,
        });
        setDisable(true);

        // update local storage
        const userInfo = {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          avatar: updatedUser.avatar,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          restaurant: updatedUser.restaurant,
          country: updatedUser.address.country,
          city: updatedUser.address.city,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    } finally {
      setLoadingBtn(false);
      setIsEditing(false);
    }
  };

  const toggleFieldsDisabled = () => {
    setIsEditing((prev) => !prev);
    setDisable(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full px-6 md:px-[12%]">
      <h1 className="text-4xl font-bold my-3">User Profile</h1>
      {isLoading && <Loading />}

      {!isLoading && (
        <form
          className="flex flex-col justify-center items-center w-full "
          onSubmit={handleSubmit}
        >
          {/* <div className="flex flex-col justify-around w-full"> */}
          <div className="flex flex-col items-start p-1 w-full ml-8">
            <span>
              <Image
                src={form.avatar || avatarPlaceHolder}
                width={200}
                height={200}
                alt="Selected Image Preview"
                priority={true}
                className="h-[200px] w-[200px] rounded-full object-cover border border-gray-300"
              />
            </span>
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImgChange}
                className="mt-4"
              />
            )}
          </div>
          {/* edit btn */}
          <div className="p-2 flex justify-end cursor-pointer hover:text-main-green w-full">
            <FiEdit className="text-2xl " onClick={toggleFieldsDisabled} />
          </div>
          {/* Name */}
          <div className="w-full flex justify-between items-center">
            <div className="w-full mr-4">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full field pl-2"
                autoComplete="name"
                value={form.firstName}
                required
                onChange={handleChange}
                disabled={disable}
              />
            </div>
            <div className="w-full">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full field"
                autoComplete="name"
                value={form.lastName}
                required
                onChange={handleChange}
                disabled={disable}
              />
            </div>
          </div>
          {/* E-Mail */}
          <div className="w-full">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full field"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={disable}
            />
          </div>

          {/* phone number  */}
          <div className="w-full">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              className="w-full field"
              autoComplete="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              disabled={disable}
            />
          </div>

          {/* address */}
          {!isEditing && (
            <div className="flex items-center justify-between w-full">
              <div className="w-full mr-4">
                <label className="mt-2">Country:</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="w-full mr-4 field"
                  value={form.country}
                  onChange={handleChange}
                  disabled={disable}
                />
              </div>

              <div className="w-full">
                <label className="mb-8">City:</label>
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
            </div>
          )}
          {isEditing && <AddressField setForm={setForm} />}

          <div className="flex justify-between w-full">
            <div className="w-full mr-4">
              <label className="mb-8">Street: </label>
              <input
                type="text"
                name="street"
                placeholder="Street"
                className="w-full field"
                value={form.street}
                onChange={handleChange}
                disabled={disable}
              />
            </div>
            <div className="w-full">
              <label>Zip Code:</label>
              <input
                type="number"
                name="zipcode"
                placeholder="Zip Code"
                className="w-full field"
                value={form.zipcode}
                onChange={handleChange}
                disabled={disable}
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex items-center justify-center">
              <Btn
                type="submit"
                text={"Update Profile"}
                loadingBtn={loadingBtn}
              />
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default UserProfile;
