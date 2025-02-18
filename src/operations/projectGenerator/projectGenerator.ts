import fs from "fs-extra";
import path from "path";
import { ProjectDetailsConfig } from "../../types";

export async function generateProject(projectDetails: ProjectDetailsConfig) {
    const { projectName } = projectDetails;
    const currentDir = process.cwd();
    const testProjectDir = path.join(currentDir, projectName);

    try {
        await fs.ensureDir(testProjectDir);
        console.log(`${projectName} folder created at: ${testProjectDir}`);
    } catch (err) {
        console.error("Error:", err);
    }
}
