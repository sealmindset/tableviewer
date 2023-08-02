import React, { useState } from 'react';
import axios from 'axios';

function FileUploader({ onFileUpload, onUploadError }) {
  const [fileData, setFileData] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:5555/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setFileData({
          filename: selectedFile.name,
          size: selectedFile.size,
          rowCount: response.data.rowCount,
        });

        onFileUpload(response.data.rows);
        setUploadError(null);
      } catch (error) {
        onUploadError(error);
        setUploadError('Error uploading file.');
      }
    }
  };

  return (
    <div className="file-uploader">
      <h2>Upload a CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {fileData && (
        <div>
          <p>File Name: {fileData.filename}</p>
          <p>File Size: {fileData.size} bytes</p>
          <p>Row Count: {fileData.rowCount}</p>
        </div>
      )}
      {uploadError && <p className="error">{uploadError}</p>}
    </div>
  );
}

export default FileUploader;
