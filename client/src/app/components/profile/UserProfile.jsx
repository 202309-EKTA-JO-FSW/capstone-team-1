"use client";
import React, { useEffect, useState } from "react";
import { fetchUser } from "@/app/lib/data";

const UserProfile = () => {
  // const [form, setForm] = useState({});
  // useEffect(() => {
  //   // Function to fetch user data and update the form state
  //   const getUserData = async () => {
  //     try {
  //       const user = await fetchUser();
  //       console.log(user);
  //       // set the form user details
  //       if (user) {
  //         setForm({
  //           phoneNumber: user.phoneNumber || "",
  //           country: user.address ? user.address.country : "",
  //           city: user.address ? user.address.city : "",
  //           street: user.address ? user.address.street : "",
  //           zipcode: user.address ? user.address.zipcode : "",
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   // Call the function to fetch user data
  //   getUserData();
  // }, []);
  return <div>UserProfile</div>;
};

export default UserProfile;

// import React, { useState, useEffect } from "react";
// import Btn from "@/app/components/Btn";
// import Image from "next/image";
// import { fetchUser, fetchUserUpdate } from "@/app/lib/data";

// import { FiEdit } from "react-icons/fi";
// import { useAppSelector } from "@/app/redux/hooks";
// import NotFound from "@/app/not-found";
// const UserProfile =  () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [disable, setDisable] = useState(false);
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     street: "",
//     city: "",
//     zipcode: "",
//     country: "",
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [file, setFile] = useState();
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const getUserInfo = async () => {
//       try {
//         setIsLoading(true);
//         const user = await fetchUser();
//         if (user) {
//           setForm({
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             street: user.address.street,
//             city: user.address.city,
//             zipcode: user.address.zipcode,
//             country: user.address.country,
//           });
//         }
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     getUserInfo();

//     setDisable(true);
//   }, []);

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setForm({ ...form, [name]: value });
//   //   setIsSubmitted(false);
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const formData = new FormData();
//   //   formData.append("firstName", form.firstName);
//   //   formData.append("lastName", form.lastName);
//   //   formData.append("email", form.email);
//   //   formData.append("phoneNumber", form.phoneNumber);
//   //   formData.append("street", form.street);
//   //   formData.append("city", form.city);
//   //   formData.append("zipcode", form.zipcode);

//   //   formData.append("country", form.country);

//   //   formData.append("avatar", file);
//   //   setIsLoading(true);
//   //   const updateUserInfo = await fetchUserUpdate(formData);
//   //   setForm(updateUserInfo);
//   //   setIsLoading(false);
//   //   setDisable(true);
//   //   setIsSubmitted(true);
//   // };

//   // const toggleFieldsDisabled = () => {
//   //   setIsEditing((prev) => !prev);
//   //   setDisable(false);
//   // };
//   return (
//     <div>hi</div>
//     // <div className="flex flex-col justify-center items-center w-full p-2">
//     //   <h1 className="text-4xl font-bold my-3">User Profile</h1>
//     //   <div className="flex flex-col justify-around w-full ">
//     //     {isSubmitted && <p> User Info updated Successfully</p>}
//     //     <form
//     //       className="flex flex-col justify-center items-center w-full "
//     //       onSubmit={handleSubmit}
//     //     >
//     //       <div className="flex flex-col justify-around w-full">
//     //         <div className="flex flex-col p-1">
//     //           <span className=" h-[160px]  w-[200px] flex justify-center border border-gray-300">
//     //             {file && (
//     //               <Image
//     //                 src={URL.createObjectURL(file)}
//     //                 width={200}
//     //                 height={160}
//     //                 alt="Selected Image Preview"
//     //                 priority={true}
//     //                 className="w-auto h-auto rounded"
//     //               />
//     //             )}
//     //           </span>
//     //           {isEditing && (
//     //             <input
//     //               name={file}
//     //               type="file"
//     //               accept="image/*"
//     //               onChange={(e) => setFile(e.target.files[0])}
//     //               className="mt-4"
//     //             />
//     //           )}
//     //           <section className="flex justify-end p-2 cursor-pointer hover:text-main-green">
//     //             <FiEdit className="text-2xl " onClick={toggleFieldsDisabled} />
//     //           </section>
//     //           {/* Name */}
//     //           <input
//     //             type="text"
//     //             name="firstName"
//     //             placeholder="First Name"
//     //             className="w-full field mb-4"
//     //             autoComplete="name"
//     //             value={form.firstName}
//     //             required
//     //             onChange={handleChange}
//     //             disabled={disable}
//     //           />

//     //           <input
//     //             type="text"
//     //             name="lastName"
//     //             placeholder="Last Name"
//     //             className="w-full field mb-4"
//     //             autoComplete="name"
//     //             value={form.lastName}
//     //             required
//     //             onChange={handleChange}
//     //             disabled={disable}
//     //           />
//     //           {/* Type */}
//     //           <input
//     //             type="email"
//     //             name="email"
//     //             placeholder="E-Mail"
//     //             className="w-full field mb-4"
//     //             autoComplete="email"
//     //             value={form.email}
//     //             onChange={handleChange}
//     //             required
//     //             disabled={disable}
//     //           />

//     //           <input
//     //             type="number"
//     //             name="phoneNumber"
//     //             placeholder="Phone Number"
//     //             className="w-full field mb-4"
//     //             autoComplete="phoneNumber"
//     //             value={form.phoneNumber}
//     //             onChange={handleChange}
//     //             required
//     //             disabled={disable}
//     //           />
//     //           {/* address */}
//     //           <div className="flex items-center justify-between w-full">
//     //             <input
//     //               type="text"
//     //               name="street"
//     //               placeholder="Street"
//     //               className="w-full mr-4 field"
//     //               value={form.street}
//     //               onChange={handleChange}
//     //               disabled={disable}
//     //             />
//     //             <input
//     //               type="text"
//     //               name="city"
//     //               placeholder="City"
//     //               className="w-full field"
//     //               value={form.city}
//     //               onChange={handleChange}
//     //               disabled={disable}
//     //             />
//     //           </div>
//     //           <div className="flex justify-between w-full">
//     //             <input
//     //               type="number"
//     //               name="zipcode"
//     //               placeholder="Zip Code"
//     //               className="w-full mr-4 field"
//     //               value={form.zipcode}
//     //               onChange={handleChange}
//     //               disabled={disable}
//     //             />
//     //             <input
//     //               type="text"
//     //               name="country"
//     //               placeholder="Country"
//     //               className="w-full field"
//     //               value={form.country}
//     //               onChange={handleChange}
//     //               disabled={disable}
//     //             />
//     //           </div>
//     //         </div>
//     //         <div className="flex items-center justify-center">
//     //           <Btn type="submit" text={"Update Profile"} />
//     //         </div>
//     //       </div>
//     //     </form>
//     //     {isLoading && <p className="font-bold p-2">Pending...</p>}
//     //   </div>
//     // </div>
//   );
// };

// export default UserProfile;
