import React from 'react';

function RowModal({ rowData, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {rowData && Object.keys(rowData).map((key, index) => (
          <div key={index} className="row">
            <div className="column header">{key}</div>
            <div className="column data">{rowData[key]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RowModal;
