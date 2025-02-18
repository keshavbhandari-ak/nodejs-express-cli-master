import CommandLineService from "../../services/commandLineService";

export async function generatePackageJson() {
    try {
        const commandLineObj = CommandLineService.getInstance();
        await commandLineObj.executeCommand("npm", ["init", "-y"]);
    } catch (error) {
        console.error("Error:", error);
    }
}
