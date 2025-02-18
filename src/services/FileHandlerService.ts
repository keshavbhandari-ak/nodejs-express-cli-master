import fs from "fs-extra";
import path from "path";

class FileHandlerService {
    private static instance: FileHandlerService;

    private constructor() {}

    public static getInstance(): FileHandlerService {
        if (!FileHandlerService.instance) {
            FileHandlerService.instance = new FileHandlerService();
        }
        return FileHandlerService.instance;
    }

    writeFile(fileContent: string | Record<string, any>, filePath: string) {
        try {
            fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
            console.log(`${filePath} has been created successfully!`);
        } catch (err) {
            console.error(`Error writing ${filePath}:`, err);
        }
    }
}

export default FileHandlerService;
