import { input } from "@inquirer/prompts";
import { spawn } from "child_process";

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
}

export default CommandLineService;
