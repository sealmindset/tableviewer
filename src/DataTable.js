import React, { useState } from 'react';

function DataTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  const columns = Object.keys(data[0] || {});

  const sortData = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortOrder('asc');
    }
  };

  const filterData = (columnName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [columnName]: value }));
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = (currentPage - 1) * rowsPerPage;
  const currentRows = data
    .filter((row) =>
      columns.some((column) =>
        row[column].toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter((row) => {
      // Apply filters
      for (const key in filters) {
        if (!filters[key] || row[key].toLowerCase().includes(filters[key].toLowerCase())) {
          return true;
        }
      }
      return false;
    })
    .sort((a, b) => {
      if (sortColumn) {
        const comparison = a[sortColumn].localeCompare(b[sortColumn]);
        return sortOrder === 'asc' ? comparison : -comparison;
      }
      return 0;
    });

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>
                <input
                  type="text"
                  placeholder={`Filter ${column}...`}
                  value={filters[column] || ''}
                  onChange={(e) => filterData(column, e.target.value)}
                />
              </th>
            ))}
          </tr>
          <tr>
            {columns.map((column) => (
              <th key={column} onClick={() => sortData(column)}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows
            .slice(indexOfFirstRow, indexOfLastRow)
            .map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column}>{row[column]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentRows.length < rowsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;
