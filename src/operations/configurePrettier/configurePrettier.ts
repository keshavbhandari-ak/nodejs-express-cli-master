import path from "path";
import CommandLineService from "../../services/commandLineService";
import FileHandlerService from "../../services/FileHandlerService";
import { prettierIgnoreContent, prettierRcContent } from "./fileContent";
import { FileType } from "../../types";
import { infoLog } from "../../utils/logger";
import Messages from "../../constants/messages";

function addPrettierScriptsInPackageJson() {
    const fileHandlerObj = FileHandlerService.getInstance();
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = fileHandlerObj.readFile(packageJsonPath, FileType.JSON);
    packageJson.scripts = {
        ...packageJson.scripts,
        format: "prettier --write .",
        "format:check": "prettier --check ."
    };
    fileHandlerObj.writeFile(packageJson, packageJsonPath, FileType.JSON);
}

function configurePrettierRcFile() {
    const fileHandlerObj = FileHandlerService.getInstance();
    const filePath = path.join(process.cwd(), ".prettierrc");
    fileHandlerObj.writeFile(prettierRcContent, filePath, FileType.JSON);
}

function configurePrettierIgnoreFile() {
    const fileHandlerObj = FileHandlerService.getInstance();
    const filePath = path.join(process.cwd(), ".prettierignore");
    fileHandlerObj.writeFile(prettierIgnoreContent, filePath, FileType.TEXT);
}

async function installPrettierDependencies() {
    const commandLineObj = CommandLineService.getInstance();
    await commandLineObj.installDependencies(["prettier"], true);
}

export async function configureEsLint() {
    infoLog(Messages.configuringEsLint);
    await installPrettierDependencies();
    configurePrettierRcFile();
    addPrettierScriptsInPackageJson();
}

export async function configurePrettier() {
    infoLog(Messages.configuringPrettier);
    await installPrettierDependencies();
    configurePrettierRcFile();
    configurePrettierIgnoreFile();
    addPrettierScriptsInPackageJson();
}
