import React from "react";

function Pagination({ limit, length }) {
  const paginationNumbers = [];
  console.log("limit", limit);
  console.log("length", length);
  for (let i = 1; i <= Math.ceil(length / limit); i++) {
    paginationNumbers.push(i);
    console.log("pagination", paginationNumbers);
  }
  return (
    <div className="pagination">
      {paginationNumbers.map((pageNumber) => (
        <button key={pageNumber}>{pageNumber}</button>
      ))}
    </div>
  );
}

export default Pagination;
