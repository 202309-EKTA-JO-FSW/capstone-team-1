import React from "react";

function Pagination({ onNextPage }) {
  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
        onClick={onNextPage}
      >
        Next Page
      </button>
    </div>
  );
}

export default Pagination;
