import fs from "fs-extra";
import path from "path";
import { initializeTypescript } from "../initTypescript";
import { generatePackageJson } from "../initPackageJson";
import { initGit } from "../initGit";
import { setupExpressServer } from "../setupExpressServer";
import ProjectMetadataService from "../../services/projectMetadataService";

const createProjectDirectory = async (projectName: string) => {
    const currentDir = process.cwd();
    const projectDirectory = path.join(currentDir, projectName);
    try {
        await fs.ensureDir(projectDirectory);
        console.log(`${projectName} folder created at: ${projectDirectory}`);
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
    await setupExpressServer();
}
