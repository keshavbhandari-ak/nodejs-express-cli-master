import path from "path";
import fs from "fs-extra";

function createDirectories(dirPath: string) {
    const parts = dirPath.split(path.sep);
    let currentPath = "";

    // Iterate through each part and build the path incrementally
    parts.forEach((part) => {
        // Build the current directory path
        currentPath = currentPath ? path.join(currentPath, part) : part;

        // If it doesn't exist, create it
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
            console.log(`Created directory: ${currentPath}`);
        }
    });
}

export { createDirectories };
