import { ProjectDetailsConfig } from "../types";

class ProjectMetadataService {
    private static instance: ProjectMetadataService;
    projectDetails: ProjectDetailsConfig = {} as ProjectDetailsConfig;

    private constructor() {}

    public static getInstance(): ProjectMetadataService {
        if (!ProjectMetadataService.instance) {
            ProjectMetadataService.instance = new ProjectMetadataService();
        }
        return ProjectMetadataService.instance;
    }

    setProjectMetaData(projectMetadata: ProjectDetailsConfig) {
        this.projectDetails = projectMetadata;
    }

    getProjectName() {
        return this.projectDetails.projectName;
    }

    getPackageManager() {
        return this.projectDetails.packageManager;
    }
}

export default ProjectMetadataService;
