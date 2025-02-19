import path from "path";
import CommandLineService from "../../services/commandLineService";
import FileHandlerService from "../../services/FileHandlerService";
import { FileType } from "../../types";

async function initPackageJson() {
    const commandLineObj = CommandLineService.getInstance();
    await commandLineObj.executeCommand("npm", ["init", "-y"]);
}

function updateScriptsInPackageJson() {
    const fileHandlerObj = FileHandlerService.getInstance();
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = fileHandlerObj.readFile(packageJsonPath, FileType.JSON);
    packageJson.scripts = {
        ...packageJson.scripts,
        start: "npx ts-node server.ts"
    };
    fileHandlerObj.writeFile(packageJson, packageJsonPath, FileType.JSON);
}

export async function generatePackageJson() {
    try {
        await initPackageJson();
        updateScriptsInPackageJson();
    } catch (error) {
        console.error("Error:", error);
    }
}
