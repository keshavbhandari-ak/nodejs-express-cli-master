#!/usr/bin/env node

import { generateProject } from "./operations/projectGenerator";
import { getProjectName } from "./questions";

async function main() {
    const projectName = await getProjectName();
    const projectDetails = {
        projectName
    };

    generateProject(projectDetails);
}

main();
