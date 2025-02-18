import fs from "fs-extra";
import path from "path";
import { FileType } from "../types";

class FileHandlerService {
    private static instance: FileHandlerService;

    private constructor() {}

    public static getInstance(): FileHandlerService {
        if (!FileHandlerService.instance) {
            FileHandlerService.instance = new FileHandlerService();
        }
        return FileHandlerService.instance;
    }

    writeFile(fileContent: any, filePath: string, fileType: string) {
        try {
            if (fileType === FileType.JSON) {
                fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
            } else if (fileType === FileType.TEXT) {
                fs.writeFileSync(filePath, fileContent, { encoding: "utf8" });
            }
            console.log(`${filePath} has been created successfully!`);
        } catch (err) {
            console.error(`Error writing ${filePath}:`, err);
        }
    }
}

export default FileHandlerService;
