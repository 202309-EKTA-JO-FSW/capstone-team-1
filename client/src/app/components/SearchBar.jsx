import React from "react";

function SearchBar({ placeholder, searchTxt, setSearchTxt }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        id="location-search"
        className="block p-2.5 w-full z-20 text-sm rounded-lg border-2 outline-none bg-gray-50 border-main-green placeholder-gray-400 text-black"
        placeholder={placeholder}
        value={searchTxt}
        onChange={(e) => setSearchTxt(e.target.value)}
      />
      <div className="absolute top-1 right-0 h-full p-2.5 text-sm font-extrabold rounded-lg text-main-green">
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </div>
    </div>
  );
}

export default SearchBar;
