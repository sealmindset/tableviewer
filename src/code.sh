#!/bin/bash

# Array of files to process
files_to_process=(
  "/Users/robvance/Documents/GitHub/tableviewer/src/App.js"
  "/Users/robvance/Documents/GitHub/tableviewer/src/DataTable.js"
  "/Users/robvance/Documents/GitHub/tableviewer/src/FileUploader.js"
  "/Users/robvance/Documents/GitHub/tableviewer/server.js"
  # Add more file paths here as needed
)

# Function to add a file's filename to code.txt and append its content
function add_file_to_code {
    echo "Adding $1's filename to code.txt"
    echo "$1" >> code.txt
    pbcopy < "$1" && pbpaste >> code.txt
    echo "Adding a blank row to code.txt"
    echo "" >> code.txt
}

# Loop through the files in the array and call the function for each file
for file in "${files_to_process[@]}"; do
    if [ -f "$file" ]; then
        add_file_to_code "$file"
    fi
done

