import { input } from "@inquirer/prompts";

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
}

export default CommandLineService;
