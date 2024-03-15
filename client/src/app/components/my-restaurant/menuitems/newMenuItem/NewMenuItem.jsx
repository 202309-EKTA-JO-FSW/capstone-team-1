"use client";
import React, { useState } from "react";
import Btn from "@/app/components/Btn";

const NewMenuItem = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    description: "",
    available: false,
    
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="px-4 py-15">
        <div className="flex flex-col items-center justify-center relative top-5 left-3">
          <h1 className="font-bold text-[24px] p-2">Add Menu Item</h1>
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
                className="w-full p-6 field h-32"
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
                  required
                />
                <label className="p-2">Available</label>
              </div>
              {/* Image */}
              <div className="flex items-center">
                <label className="p-2">Image: </label>
                <input
                  type="file"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Btn type="submit" text={"Add Item"} />
            </div>
          </form>
        </div>
      </div>
      <div className=" md:block">
        <div className="px-4 py-2">
          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              alt="Selected Image"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewMenuItem;
