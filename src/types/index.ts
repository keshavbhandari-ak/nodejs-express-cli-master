export enum FileType {
    JSON = "JSON",
    TEXT = "TEXT"
}

export enum PackageManager {
    NPM = "npm",
    YARN = "yarn",
    PNPM = "pnpm"
}

export type ProjectDetailsConfig = {
    projectName: string;
    packageManager: string;
};

export type Choice = {
    name: string;
    value: unknown;
};
