const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const csvParser = require('csv-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 5555;

app.use(cors()); // Use the cors middleware
app.use(fileUpload());

app.post('/api/upload', (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const uploadedFile = req.files.file;
  const filePath = `${__dirname}/uploads/${uploadedFile.name}`;

  uploadedFile.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    let rowCount = 0;
    const rows = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        rowCount++;
        rows.push(row);
      })
      .on('end', () => {
        res.json({ message: 'File uploaded successfully.', rowCount, rows });
      });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
