"use client";
import React, { useState } from "react";
import Btn from "@/app/components/Btn";
import Image from "next/image";
import { postItem } from "@/app/lib/data";

const NewMenuItem = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    description: "",
    available: false,
    image: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: newValue });
    setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("type", form.type);
    formData.append("description", form.description);
    formData.append("available", form.available);
    formData.append("image", file);

    const newMenuItem = await postItem(formData);

    if (newMenuItem) {
      setIsSubmitted(true);
      setForm({
        name: "",
        price: "",
        type: "",
        description: "",
        available: false,
        image: null,
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="px-4 py-15">
          <div className="flex flex-col items-center justify-center relative top-5 left-3">
            <h1 className="font-bold text-[24px] p-2">Add Menu Item</h1>
            {isSubmitted && <p>Item added successfully!</p>}
            <form className="w-full " onSubmit={handleSubmit}>
              <div className="flex flex-col p-2">
                {/* Name */}
                <input
                  type="Name"
                  name="name"
                  placeholder="Name"
                  className="w-full field"
                  autoComplete="name"
                  value={form.name}
                  required
                  onChange={handleChange}
                />

                {/* Price */}
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="w-full field"
                  autoComplete="off"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
                {/* Type */}
                <input
                  type="type"
                  name="type"
                  placeholder="Type"
                  className="w-full field"
                  autoComplete="off"
                  value={form.type}
                  onChange={handleChange}
                  required
                />

                {/* Description */}
                <textarea
                  type="description"
                  name="description"
                  placeholder="Description"
                  className="w-full p-4 field h-32 mb-4"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
                {/* Available  */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="available"
                    placeholder="Available"
                    className="px-2"
                    checked={form.available}
                    onChange={handleChange}
                  />
                  <label className="p-2">Available</label>
                </div>
                {/* Image */}
                <div className="flex items-center">
                  <label className="p-2">Image: </label>
                  <input
                    filename={file}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Btn type="submit" text={"Add Item"} />
              </div>
            </form>
          </div>
        </div>
        {file && (
          <div className="md:flex items-center justify-center">
            <Image
              src={URL.createObjectURL(file)}
              alt="Selected Image"
              height={350}
              width={350}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default NewMenuItem;
