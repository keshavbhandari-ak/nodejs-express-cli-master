import path from "path";
import CommandLineService from "../../services/commandLineService";
import FileHandlerService from "../../services/FileHandlerService";
import { developmentDotEnvContent, productionDotEnvContent } from "./fileContent";
import { FileType } from "../../types";
import { infoLog } from "../../utils/logger";
import Messages from "../../constants/messages";
const fileHandlerObj = FileHandlerService.getInstance();

async function installDotenv() {
    try {
        const commandLineObj = CommandLineService.getInstance();
        await commandLineObj.installDependencies(["dotenv"]);
    } catch (error) {
        console.error("Error:", error);
    }
}

function generateEnvFiles() {
    const devFilePath = path.join(process.cwd(), ".env.development");
    fileHandlerObj.writeFile(developmentDotEnvContent, devFilePath, FileType.TEXT);
    const prodFilePath = path.join(process.cwd(), ".env.production");
    fileHandlerObj.writeFile(productionDotEnvContent, prodFilePath, FileType.TEXT);
}

export async function configureDotenv() {
    infoLog(Messages.configuringDotEnvFiles);
    await installDotenv();
    generateEnvFiles();
}
