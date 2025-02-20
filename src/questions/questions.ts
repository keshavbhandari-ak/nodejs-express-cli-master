import Messages from "../constants/messages";
import CommandLineService from "../services/commandLineService";
import { PackageManager } from "../types";
const commandLineInstance = CommandLineService.getInstance();

export async function getProjectName() {
    const projectName = await commandLineInstance.getInputFromUser(Messages.askProjectName);
    return projectName;
}

export async function getPackageManger() {
    const choices = [
        {
            name: "npm",
            value: PackageManager.NPM
        },
        {
            name: "yarn",
            value: PackageManager.YARN
        },
        {
            name: "pnpm",
            value: PackageManager.PNPM
        }
    ];
    const selectedPackageManager = await commandLineInstance.getChoiceFromUser(Messages.askPackageManager, choices);
    return selectedPackageManager as string;
}
