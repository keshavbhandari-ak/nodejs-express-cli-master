#!/usr/bin/env node

import fs from "fs-extra";
// import inquirer from "inquirer";
// import chalk from "chalk";
import path from "path";

async function main() {
    const currentDir = process.cwd();
    const testProjectDir = path.join(currentDir, 'Test-Project');

    try {
        await fs.ensureDir(testProjectDir);
        console.log(`'Test-Project' folder created at   : ${testProjectDir}`);
      } catch (err) {
        console.error('Error:', err);
    }
}

main();