import React from 'react';

const StatusFilter = ({ onChange }) => {
  const handleFilterChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="my-4">
      <label htmlFor="status-filter" className="block text-lg font-medium text-gray-700 mb-2">
        Filter by Status:
      </label>
      <select
        id="status-filter"
        onChange={handleFilterChange}
        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">All</option>
        <option value="false">Pending</option>
        <option value="true">Completed</option>
      </select>
    </div>
  );
};

export default StatusFilter;
