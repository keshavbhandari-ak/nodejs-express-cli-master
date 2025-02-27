import path from "path";
import CommandLineService from "../../services/commandLineService";
import FileHandlerService from "../../services/FileHandlerService";
import { FileType } from "../../types";
import ProjectMetadataService from "../../services/projectMetadataService";
import Messages from "../../constants/messages";
import { infoLog } from "../../utils/logger";

async function initPackageJson() {
    const commandLineObj = CommandLineService.getInstance();
    const projectMetadataServiceObj = ProjectMetadataService.getInstance();
    const command = projectMetadataServiceObj.getPackageManager();
    await commandLineObj.executeCommand(command, ["init", "-y"]);
}

function updateScriptsInPackageJson() {
    const fileHandlerObj = FileHandlerService.getInstance();
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = fileHandlerObj.readFile(packageJsonPath, FileType.JSON);
    packageJson.scripts = {
        ...packageJson.scripts,
        build: "tsc",
        start: "npx ts-node server.ts"
    };
    packageJson.main = "dist/server.js";
    fileHandlerObj.writeFile(packageJson, packageJsonPath, FileType.JSON);
}

export async function generatePackageJson() {
    try {
        infoLog(Messages.generatePackgeJson);
        await initPackageJson();
        updateScriptsInPackageJson();
    } catch (error) {
        console.error("Error:", error);
    }
}
