import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <div className="pagination">
      <button className="bg-blue-800 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded mr-2" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        Prev
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button className="bg-blue-900 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded mr-2" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
