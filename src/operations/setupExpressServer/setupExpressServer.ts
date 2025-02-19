import path from "path";
import CommandLineService from "../../services/commandLineService";
import FileHandlerService from "../../services/FileHandlerService";
import { FileType } from "../../types";
import {
    appFileContent,
    configFileContent,
    controllersFileContent,
    modelsFileContent,
    routesFileContent,
    serverFileContent,
    servicesFileContent
} from "./fileContents";
import { createDirectories } from "../../utils/fileSystem";
const fileHandler = FileHandlerService.getInstance();

function createServerFile() {
    const filePath = path.join(process.cwd(), "server.ts");
    fileHandler.writeFile(serverFileContent, filePath, FileType.TEXT);
}

function createServicesFile() {
    createDirectories("src/services");
    const filePath = path.join(process.cwd(), "src", "services", "user.service.ts");
    fileHandler.writeFile(servicesFileContent, filePath, FileType.TEXT);
}

function createRoutesFile() {
    createDirectories("src/routes");
    const filePath = path.join(process.cwd(), "src", "routes", "user.routes.ts");
    fileHandler.writeFile(routesFileContent, filePath, FileType.TEXT);
}

function createModelsFile() {
    createDirectories("src/models");
    const filePath = path.join(process.cwd(), "src", "models", "user.model.ts");
    fileHandler.writeFile(modelsFileContent, filePath, FileType.TEXT);
}

function createControllersFile() {
    createDirectories("src/controllers");
    const filePath = path.join(process.cwd(), "src", "controllers", "user.controller.ts");
    fileHandler.writeFile(controllersFileContent, filePath, FileType.TEXT);
}

function createAppFile() {
    createDirectories("src");
    const filePath = path.join(process.cwd(), "src", "app.ts");
    fileHandler.writeFile(appFileContent, filePath, FileType.TEXT);
}

function createConfigFile() {
    createDirectories("src");
    const filePath = path.join(process.cwd(), "src", "config.ts");
    fileHandler.writeFile(configFileContent, filePath, FileType.TEXT);
}

async function installExpress() {
    const commandLineObj = CommandLineService.getInstance();
    await commandLineObj.executeCommand("npm", ["install", "express"]);
    await commandLineObj.executeCommand("npm", ["install", "--save-dev", "@types/express"]);
}

export async function setupExpressServer() {
    await installExpress();
    createConfigFile();
    createAppFile();
    createControllersFile();
    createModelsFile();
    createRoutesFile();
    createServicesFile();
    createServerFile();
}
