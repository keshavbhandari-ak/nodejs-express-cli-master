import chalk, { ColorName } from "chalk";
import { Config } from "../../constants/config";

const log = console.log;

function logger(color: ColorName, text: string | string[]) {
    log(chalk[color](text));
}

export function infoLog(message: string) {
    logger("cyan", `++++++++++++++++++++++ ${message} ++++++++++++++++++++++`);
}

export function debugLog(message: string) {
    if (Config.DEBUG_MODE) {
        console.log(message);
    }
}

export default logger;
