"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdModeEdit, MdCheck, MdClose, MdDelete } from "react-icons/md";
import { fetchdeleteMenuItem, fetchUpdateMenuItem } from "@/app/lib/data";
import menuItemImage from "../../../../../public/image/menuItem-image-placeholder.png";
import { useRouter } from "next/navigation";

const MenuItemCard = ({ menuItem, onDelete }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMenuItem, setEditedMenuItem] = useState(menuItem);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedMenuItem(menuItem);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditedMenuItem(editedMenuItem);
    setIsEditing(false);
    const updatedMenuItem = await fetchUpdateMenuItem(
      menuItem._id,
      editedMenuItem
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setEditedMenuItem({ ...editedMenuItem, [name]: newValue });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      await fetchdeleteMenuItem(menuItem._id);
      onDelete(menuItem._id);
    }
  };
  return (
    <div className="h-[460px]  w-[200px] sm:w-[210px] md:w-[220px] lg:w-[230px] m-6 flex flex-col justify-center bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:bg-light-green">
      <div className="relative h-[250px] w-[full] flex justify-center items-center rounded">
        <Image
          src={editedMenuItem.image || menuItemImage}
          alt={editedMenuItem.name}
          width={180}
          height={180}
          priority="true"
        />
      </div>
      <div className="justify-center p-2 font-normal">
        {isEditing ? (
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedMenuItem.name}
              onChange={handleChange}
              className="text-l  mb-2 focus:outline-none"
            />
          </div>
        ) : (
          <h2 className="text-xl font-semibold mb-2">{editedMenuItem.name}</h2>
        )}

        {isEditing ? (
          <label>
            Type:
            <input
              type="text"
              name="type"
              value={editedMenuItem.type}
              onChange={handleChange}
              className="text-gray-600 mb-2 focus:outline-none"
            />
          </label>
        ) : (
          <p className="text-gray-600 mb-2">Type: {editedMenuItem.type}</p>
        )}

        {isEditing ? (
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={editedMenuItem.price}
              onChange={handleChange}
              className="text-gray-600 mb-2 focus:outline-none"
            />
          </label>
        ) : (
          <p className="text-gray-600 mb-2">Price: {editedMenuItem.price}</p>
        )}

        {isEditing ? (
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={editedMenuItem.description}
              onChange={handleChange}
              className="text-gray-600 mb-2 focus:outline-none"
            />
          </label>
        ) : (
          <p className="text-gray-600 mb-2 truncate">
            Description:{editedMenuItem.description}
          </p>
        )}

        {isEditing ? (
          <label>
            Available:
            <input
              type="checkbox"
              name="available"
              checked={editedMenuItem.available}
              onChange={handleChange}
              className="text-gray-600 mb-2 focus:outline-none"
            />
          </label>
        ) : (
          <p className="text-gray-600 mb-2">
            Available: {editedMenuItem.available ? "Yes" : "No"}
          </p>
        )}
        {isEditing ? (
          <div className="flex justify-between">
            <button onClick={handleSubmit}>
              <MdCheck className="text-2xl text-main-green" />
            </button>
            <button onClick={handleCancelEdit}>
              <MdClose className="text-2xl text-red-500" />
            </button>
          </div>
        ) : (
          <div className="flex flex-row justify-start">
            <button
              onClick={handleEdit}
              className="text-gray-500  hover:text-black px-1"
            >
              <MdModeEdit className="text-2xl " />
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-500 hover:text-black  px-1"
            >
              <MdDelete className="text-2xl " />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
