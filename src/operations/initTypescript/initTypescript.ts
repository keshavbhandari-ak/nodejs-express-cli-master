import path from "path";
import CommandLineService from "../../services/commandLineService";
import FileHandlerService from "../../services/FileHandlerService";
import { FileType } from "../../types";

const installTypescriptDependencies = async () => {
    try {
        const commandLineObj = CommandLineService.getInstance();
        await commandLineObj.executeCommand("npm", ["install", "--save-dev", "typescript", "ts-node", "@types/node"]);
    } catch (error) {
        console.error("Error:", error);
    }
};

const createTsConfigJson = () => {
    const tsConfig = {
        compilerOptions: {
            target: "ES6",
            module: "CommonJS",
            outDir: "./dist",
            rootDir: "./",
            strict: true,
            esModuleInterop: true
        }
    };
    const filePath = path.join(process.cwd(), "tsconfig.json");
    const fileHandler = FileHandlerService.getInstance();
    fileHandler.writeFile(tsConfig, filePath, FileType.JSON);
};

export async function initializeTypescript() {
    await installTypescriptDependencies();
    createTsConfigJson();
}
