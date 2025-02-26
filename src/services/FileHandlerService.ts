import fs from "fs-extra";
import { FileType } from "../types";
import { debugLog } from "../utils/logger";

class FileHandlerService {
    private static instance: FileHandlerService;

    private constructor() {}

    public static getInstance(): FileHandlerService {
        if (!FileHandlerService.instance) {
            FileHandlerService.instance = new FileHandlerService();
        }
        return FileHandlerService.instance;
    }

    writeFile(fileContent: object | string, filePath: string, fileType: string) {
        try {
            if (fileType === FileType.JSON) {
                fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2));
            } else if (fileType === FileType.TEXT) {
                fs.writeFileSync(filePath, fileContent as string, { encoding: "utf8" });
            }
            debugLog(`${filePath} has been created successfully!`);
        } catch (err) {
            console.error(`Error writing ${filePath}:`, err);
        }
    }

    readFile(filePath: string, fileType: string) {
        try {
            const data = fs.readFileSync(filePath, "utf8");
            if (fileType === FileType.JSON) {
                return JSON.parse(data);
            } else {
                return data;
            }
        } catch {
            console.log(`Error Reading ${filePath}`);
        }
    }
}

export default FileHandlerService;
