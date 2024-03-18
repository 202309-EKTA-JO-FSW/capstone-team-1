import React from "react";

function SingleSearch({ value, onChange, onSubmit }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="search"
        id="location-search"
        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:border-blue-200"
        placeholder="Search menu items"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-gray-600 rounded-lg border hover:bg-green-500 focus:outline-none focus:bg-green-500"
        onClick={onSubmit}
      >
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
      </button>
    </div>
  );
}

export default SingleSearch;