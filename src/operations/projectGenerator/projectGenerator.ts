import fs from "fs-extra";
import path from "path";
import { ProjectDetailsConfig } from "../../types";
import CommandLineService from "../../services/commandLineService";
import { initializeTypescript } from "../initTypescript";
import { generatePackageJson } from "../initPackageJson";
import { initGit } from "../initGit";

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

export async function generateProject(projectDetails: ProjectDetailsConfig) {
    const { projectName } = projectDetails;
    const projectDirectory = await createProjectDirectory(projectName);
    process.chdir(projectDirectory);
    await initGit();
    await generatePackageJson();
    await initializeTypescript();
}
