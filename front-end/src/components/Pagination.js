import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      <button
        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>
      <span className="text-lg font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
