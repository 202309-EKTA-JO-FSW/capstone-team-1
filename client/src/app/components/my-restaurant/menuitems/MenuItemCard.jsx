"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdModeEdit, MdCheck, MdClose } from "react-icons/md";

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

  const handleSaveEdit = () => {
    // You can implement the functionality to save the edited menu item here
    console.log("Edited menu item:", editedMenuItem);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMenuItem({ ...editedMenuItem, [name]: value });
  };

  return (
    <div className="h-[400px] w-full sm:w-[250px] m-1 sm:m-6 flex flex-col justify-center bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:bg-violet-100">
      <div className="h-[350px] flex justify-center items-center p-1 rounded">
        <Image
          src={editedMenuItem.image}
          alt={editedMenuItem.name}
          width={300}
          height={300}
          className="rounded"
          priority="true"
        />
      </div>
      <div className="p-4">
        {isEditing ? (
          <label>
            Name
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
          <input
            type="text"
            name="type"
            value={editedMenuItem.type}
            onChange={handleChange}
            className="text-gray-600 mb-2 focus:outline-none"
          />
        ) : (
          <p className="text-gray-600 mb-2">Type: {editedMenuItem.type}</p>
        )}

        {isEditing ? (
          <input
            type="text"
            name="description"
            value={editedMenuItem.description}
            onChange={handleChange}
            className="text-gray-600 mb-2 focus:outline-none"
          />
        ) : (
          <p className="text-gray-600 mb-2">
            Description: {editedMenuItem.description}
          </p>
        )}

        {isEditing ? (
          <input
            type="number"
            name="price"
            value={editedMenuItem.price}
            onChange={handleChange}
            className="text-gray-600 mb-2 focus:outline-none"
          />
        ) : (
          <p className="text-gray-600 mb-2">Price: {editedMenuItem.price}</p>
        )}

        {isEditing ? (
          <input
            type="checkbox"
            name="available"
            value={editedMenuItem.available}
            onChange={handleChange}
            className="text-gray-600 mb-2 focus:outline-none"
          />
        ) : (
          <p className="text-gray-600 mb-2">
            Availability: {editedMenuItem.available}
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
          <button onClick={handleEdit} className="text-gray-600">
            <MdModeEdit />
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
