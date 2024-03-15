'use client';
import Image from 'next/image';

const MenuItemCard = ({ menuItem }) => {
  if (!menuItem) {
    return <div className="text-center">No items available</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col items-center mx-4" style={{ width: 250, height: 300 }}>
      <div className="relative h-48 w-full mb-2">
        {menuItem.image ? (
          <Image
            src={menuItem.image}
            alt={menuItem.name}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold text-center mb-6">{menuItem.name}</h3>
      <div className="flex justify-between w-full">
        <div>
          <p className="text-lg font-semibold">{`${menuItem.price} ${menuItem.currency || 'JOD'}`}</p>
        </div>
        <div className="flex items-center">
          <span className="mr-1">{menuItem.rating || 4.5}</span>
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
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">Add to Cart</button>
      </div>
    </div>
  );
};

export default MenuItemCard;
