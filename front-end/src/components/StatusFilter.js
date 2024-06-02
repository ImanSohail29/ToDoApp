import React from 'react';

const StatusFilter = ({ onChange }) => {
  const handleFilterChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="status-filter">Filter by Status:</label>
      <select id="status-filter" onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="false">Pending</option>
        <option value="true">Completed</option>
      </select>
    </div>
  );
};

export default StatusFilter;
