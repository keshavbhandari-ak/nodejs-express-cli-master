#!/usr/bin/env node

import { generateProject } from "./operations/projectGenerator";
import { getPackageManger, getProjectName } from "./questions";
import ProjectMetadataService from "./services/projectMetadataService";

async function main() {
    const projectName = await getProjectName();
    const packageManager = await getPackageManger();
    const projectDetails = {
        projectName,
        packageManager
    };
    const projectMetadataServiceObj = ProjectMetadataService.getInstance();
    projectMetadataServiceObj.setProjectMetaData(projectDetails);
    generateProject();
}

main();
