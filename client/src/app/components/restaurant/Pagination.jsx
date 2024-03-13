import React from "react";

function Pagination({ totalPages, currentPage, handlePagination }) {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page or less
  }
  const paginationNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="pagination flex justify-center items-center space-x-2 mt-8">
      {paginationNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePagination(pageNumber)}
          className={`px-3 py-1 rounded-md focus:outline-none ${
            currentPage === pageNumber
              ? "bg-main-green text-white"
              : "bg-white text-bg-main-green hover:bg-opacity-75"
          }`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
