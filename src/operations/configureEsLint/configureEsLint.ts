import path from "path";
import CommandLineService from "../../services/commandLineService";
import FileHandlerService from "../../services/FileHandlerService";
import { eslintConfigMjsContent } from "./fileContent";
import { FileType } from "../../types";
import { infoLog } from "../../utils/logger";
import Messages from "../../constants/messages";

function addEsLintScriptsInPackageJson() {
    const fileHandlerObj = FileHandlerService.getInstance();
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = fileHandlerObj.readFile(packageJsonPath, FileType.JSON);
    packageJson.scripts = {
        ...packageJson.scripts,
        lint: "eslint .",
        "lint:fix": "eslint . --fix"
    };
    fileHandlerObj.writeFile(packageJson, packageJsonPath, FileType.JSON);
}

function configureEsLintFile() {
    const fileHandlerObj = FileHandlerService.getInstance();
    const filePath = path.join(process.cwd(), "eslint.config.mjs");
    fileHandlerObj.writeFile(eslintConfigMjsContent, filePath, FileType.TEXT);
}

async function installEsLintDependencies() {
    const commandLineObj = CommandLineService.getInstance();
    await commandLineObj.installDependencies(["eslint", "@eslint/js", "globals", "typescript-eslint"], true);
}

export async function configureEsLint() {
    infoLog(Messages.configuringEsLint);
    await installEsLintDependencies();
    configureEsLintFile();
    addEsLintScriptsInPackageJson();
}
