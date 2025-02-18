import path from "path";
import CommandLineService from "../../services/commandLineService";
import FileHandlerService from "../../services/FileHandlerService";
import { FileType } from "../../types";

const gitIgnoreConfig = `# Node modules
/node_modules/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS-specific files
.DS_Store
Thumbs.db

# Environment files
.env
.env.*

# Build outputs
/dist/
/build/
/out/
/coverage/

# TypeScript specific
*.tsbuildinfo

# IDE / Editor specific files
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# Dependency directories
/bower_components/

# MacOS specific
*.DS_Store

# Windows Installer files
*.cab
*.msi
*.msm
*.msp

# JetBrains specific files
.idea/
`;

const initializeGitForProject = async () => {
    try {
        const commandLineObj = CommandLineService.getInstance();
        await commandLineObj.executeCommand("git", ["init"]);
    } catch (error) {
        console.error("Error:", error);
    }
};

const generateGitIgnore = () => {
    const filePath = path.join(process.cwd(), ".gitignore");
    const fileHandler = FileHandlerService.getInstance();
    fileHandler.writeFile(gitIgnoreConfig, filePath, FileType.TEXT);
};

export async function initGit() {
    await initializeGitForProject();
    generateGitIgnore();
}
