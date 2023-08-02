import React, { useState } from 'react';
import FileUploader from './FileUploader';
import DataTable from './DataTable';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (uploadedData) => {
    setData(uploadedData);
  };

  const handleUploadError = (error) => {
    setError(error.message);
  };

  return (
    <div className="App">
      <h1>CSV File Viewer</h1>
      <FileUploader onFileUpload={handleFileUpload} onUploadError={handleUploadError} />
      <DataTable data={data} error={error} />
    </div>
  );
}

export default App;
