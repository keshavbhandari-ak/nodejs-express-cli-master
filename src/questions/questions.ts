import Messages from "../constants/messages";
import CommandLineService from "../services/commandLineService";

export async function getProjectName() {
    const commandLineInstance = CommandLineService.getInstance();
    const projectName = await commandLineInstance.getInputFromUser(Messages.askProjectName);
    return projectName;
}
