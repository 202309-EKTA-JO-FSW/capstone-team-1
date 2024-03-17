"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdModeEdit, MdCheck, MdClose, MdDelete } from "react-icons/md";
import { fetchdeleteMenuItem, fetchUpdateMenuItem } from "@/app/lib/data";
import menuItemImage from "../../../../../public/image/menuItem-image-placeholder.png";

const MenuItemCard = ({ menuItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMenuItem, setEditedMenuItem] = useState(menuItem);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedMenuItem(menuItem);
  };

  const handleSaveEdit = async (e) => {
    setEditedMenuItem(editedMenuItem);
    e.preventDefault();
    const updatedMenuItem = await fetchUpdateMenuItem(
      menuItem._id,
      editedMenuItem
    );
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMenuItem({ ...editedMenuItem, [name]: value });
  };

  const handleDelete = async (e) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );
    if (confirmDelete) {
      await fetchdeleteMenuItem(menuItem._id);
    }
  };
  return (
    <div className="h-auto w-full sm:w-[250px] m-1 sm:m-6 flex flex-col justify-center bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:bg-light-green">
      <div className="h-auto flex justify-center items-center p-1 rounded">
        <Image
          src={editedMenuItem.image || menuItemImage}
          alt={editedMenuItem.name}
          width={250}
          height={250}
          priority="true"
        />
      </div>
      <div className="p-4">
        {isEditing ? (
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editedMenuItem.name}
              onChange={handleChange}
              className="text-xl font-semibold mb-2 focus:outline-none"
            />
          </label>
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
          <p className="text-gray-600 mb-2">
            Description: {editedMenuItem.description}
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
            <button
              onClick={handleSaveEdit}
              className="text-green-500 focus:outline-none"
            >
              <MdCheck />
            </button>
            <button
              onClick={handleCancelEdit}
              className="text-red-500 focus:outline-none"
            >
              <MdClose />
            </button>
          </div>
        ) : (
          <div className="flex flex-row justify-start">
            <button
              onClick={handleEdit}
              className="text-gray-500  hover:text-black px-2"
            >
              <MdModeEdit className="text-xl " />
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-500 hover:text-black  px-1"
            >
              <MdDelete className="text-xl " />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
