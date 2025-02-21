import path from "path";
import CommandLineService from "../../services/commandLineService";
import FileHandlerService from "../../services/FileHandlerService";
import { FileType } from "../../types";
import { infoLog } from "../../utils/logger";
import Messages from "../../constants/messages";

const installTypescriptDependencies = async () => {
    try {
        const commandLineObj = CommandLineService.getInstance();
        await commandLineObj.installDependencies(["typescript", "ts-node", "@types/node"], true);
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
    infoLog(Messages.installingTypescriptDependencies);
    await installTypescriptDependencies();
    createTsConfigJson();
}
