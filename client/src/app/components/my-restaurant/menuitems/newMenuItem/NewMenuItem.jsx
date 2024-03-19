"use client";
import React, { useState } from "react";
import Btn from "@/app/components/Btn";
import Image from "next/image";
import { postItem } from "@/app/lib/data";
import { useRouter } from "next/navigation";

const NewMenuItem = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const newMenuItem = await postItem(formData);

    if (newMenuItem.results) {
      setIsSubmitted(true);
      setForm({
        name: "",
        price: "",
        type: "",
        description: "",
        available: false,
        image: null,
      });

      router.push("/my-restaurant/menuItems"); //redirect to menuItems page after Item is successfully added
    }
  };
  return (
    <div className="w-full flex justify-center px-8 lg:px-[27%]">
      <div className="px-2 py-4 w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-[24px] p-2 text-center w-full">
            Add Menu Item
          </h1>
          {isSubmitted && <p>Item added successfully!</p>}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col p-2">
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

              {/* Image */}
              <div className="flex items-center">
                <label className="p-2 text-xl">Image: </label>
                <input
                  filename={file}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            {/* Available  */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="available"
                placeholder="Available"
                className="ml-3"
                checked={form.available}
                onChange={handleChange}
              />
              <label className="p-2">Available</label>
            </div>

            <div className="flex items-center justify-center">
              <Btn type="submit" text={"Add Item"} />
            </div>
          </form>
          {isLoading && <p className="font-bold p-2">Pending...</p>}
          {file && (
            <div className="flex justify-center items-center p-12 w-[450px]">
              <Image
                src={URL.createObjectURL(file)}
                alt="Selected Image"
                height={0}
                width={350}
                className="rounded w-auto h-auto text-center"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewMenuItem;
