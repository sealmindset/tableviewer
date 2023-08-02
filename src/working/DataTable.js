import React from 'react';

function DataTable({ data, error }) {
  return (
    <div className="data-table">
      <h2>Data Table</h2>
      {error && <p className="error">{error}</p>}
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {/* Assuming you have headers, adjust as needed */}
              {Object.keys(data[0]).map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data to display.</p>
      )}
    </div>
  );
}

export default DataTable;
