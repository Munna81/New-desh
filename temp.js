const fs = require("fs");
const path = require("path");

function getFolderList(directoryPath) {
  try {
    // Check if directory exists
    if (!fs.existsSync(directoryPath)) {
      console.error(`Directory ${directoryPath} does not exist!`);
      return null;
    }

    // Read directory contents and filter only folders
    const folderArray = fs.readdirSync(directoryPath).filter((item) => {
      const fullPath = path.join(directoryPath, item);
      return fs.statSync(fullPath).isDirectory();
    });

    return folderArray;
  } catch (error) {
    console.error("Error reading directory:", error.message);
    return null;
  }
}

// Example usage:
const imagesPath = "./images"; // Change this path to your images directory
const folders = getFolderList(imagesPath);

if (folders) {
  // Print the array
  console.log("Array of folders:", folders);

  // Print numbered list
  console.log("\nFolders in images directory:");
  folders.forEach((folder, index) => {
    console.log(`${folder}`);
  });
}
