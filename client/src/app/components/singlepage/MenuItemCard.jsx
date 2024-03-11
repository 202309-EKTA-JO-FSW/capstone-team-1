'use client';
import Image from 'next/image';
import { useState } from 'react';

const MenuItemCard = ({ menuItem }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  
  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col items-center" style={{ width: 250, height: 300 }}>
      <div className="relative h-32 w-full mb-2">
        <Image
          src={menuItem.image}
          alt={menuItem.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="text-lg font-bold text-center mb-6">{menuItem.name}</h3>
      <div className="flex justify-between w-full">
        <div>
          <p className="text-lg font-semibold">{`${menuItem.price}}`}</p>
        </div>
        <div className="flex items-center">
          <span className="mr-1">{menuItem.rating || 'No Rating'}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M17.707 9.793a1 1 0 00-1.32-.083l-3.097 2.053-1.438-4.319a1 1 0 00-1.896 0l-1.438 4.319-3.097-2.053a1 1 0 00-1.32.083 1 1 0 00.203 1.32l3.5 2.333-1.438 4.319a1 1 0 001.454 1.104l3.417-2.26 3.417 2.26a1 1 0 001.454-1.104l-1.438-4.319 3.5-2.333a1 1 0 00.203-1.32z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-between w-full mt-2">
        <button className="text-lg font-bold">Add to cart</button>
        <div className="flex items-center">
          <button
            onClick={handleDecrement}
            className="bg-green-500 text-white px-2 py-0.5 rounded-l-md border border-green-500"
          >
            -
          </button>
          <span className="px-2 py-0.5 border border-green-500">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="bg-green-500 text-white px-2 py-0.5 rounded-r-md border border-green-500"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;