import { input, select } from "@inquirer/prompts";
import { spawn } from "child_process";
import { Choice, PackageManager } from "../types";
import ProjectMetadataService from "./projectMetadataService";
const projectMetadataServiceObj = ProjectMetadataService.getInstance();

class CommandLineService {
    private static instance: CommandLineService;

    private constructor() {}

    public static getInstance(): CommandLineService {
        if (!CommandLineService.instance) {
            CommandLineService.instance = new CommandLineService();
        }
        return CommandLineService.instance;
    }

    async getInputFromUser(message: string, defaultValue?: string): Promise<string> {
        return await input({
            message,
            default: defaultValue ?? "Test"
        });
    }

    async getChoiceFromUser(message: string, choices: Choice[]) {
        const selectedChoice = await select({
            message,
            choices
        });
        return selectedChoice || choices[0].value;
    }

    async executeCommand(command: string, args: string[]) {
        return new Promise<void>((resolve, reject) => {
            const npmInit = spawn(command, args);

            npmInit.on("close", (code: number) => {
                const commandString = `${command} ${args.join(" ")}`;
                if (code === 0) {
                    console.log(`${commandString} process completed successfully`);
                    resolve();
                } else {
                    reject(new Error(`${commandString} process exited with code ${code}`));
                }
            });
        });
    }

    async installDependencies(dependencies: string[], isDevDependency: boolean = false) {
        const packageManager = projectMetadataServiceObj.getPackageManager();
        let args: string[] = [];
        if (packageManager === PackageManager.NPM) {
            args = ["install", ...(isDevDependency ? ["--save-dev"] : []), ...dependencies];
        } else if (packageManager === PackageManager.YARN) {
            args = ["add", ...(isDevDependency ? ["--dev"] : []), ...dependencies];
        } else if (packageManager === PackageManager.PNPM) {
            args = ["add", ...(isDevDependency ? ["--save-dev"] : []), ...dependencies];
        }
        await this.executeCommand(packageManager, args);
    }
}

export default CommandLineService;
