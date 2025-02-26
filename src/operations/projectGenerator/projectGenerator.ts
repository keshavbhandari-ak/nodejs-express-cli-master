import fs from "fs-extra";
import path from "path";
import { initializeTypescript } from "../initTypescript";
import { generatePackageJson } from "../initPackageJson";
import { initGit } from "../initGit";
import { setupExpressServer } from "../setupExpressServer";
import ProjectMetadataService from "../../services/projectMetadataService";
import { infoLog } from "../../utils/logger";
import Messages from "../../constants/messages";
import { configureDotenv } from "../configureDotenv";
import { configureEsLint } from "../configureEsLint";
import { configurePrettier } from "../configurePrettier/configurePrettier";

const createProjectDirectory = async (projectName: string) => {
    const currentDir = process.cwd();
    const projectDirectory = path.join(currentDir, projectName);
    try {
        infoLog(`${Messages.generatingProject} ${projectName}`);
        await fs.ensureDir(projectDirectory);
    } catch (err) {
        console.error("Error:", err);
    }
    return projectDirectory;
};

export async function generateProject() {
    const projectMetadataServiceObj = ProjectMetadataService.getInstance();
    const projectName = projectMetadataServiceObj.getProjectName();
    const projectDirectory = await createProjectDirectory(projectName);
    process.chdir(projectDirectory);
    await initGit();
    await generatePackageJson();
    await initializeTypescript();
    await configureDotenv();
    await configureEsLint();
    await configurePrettier();
    await setupExpressServer();
    infoLog(Messages.boilerPlateSuccess);
}
