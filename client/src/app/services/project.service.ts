import { Injectable } from "@angular/core";
import { RequestService } from "./requestService.service";
import { User } from "../models/user";

@Injectable()
export class ProjectService {
    constructor(private requestService: RequestService) { }

    getProjectsByUserId(userID: string) {
        return this.requestService.createGetRequestHeader(userID, 'getProjects');
    }

    getProjectById(projectID: string) {
        return this.requestService.createGetRequestHeader(projectID, 'getProject');
    }

    getProjectTasks(projectID: string) {
        return this.requestService.createGetRequestHeader(projectID, 'getProjectTasks');
    }

    getUsersOnProject(projectId: string) {
        return this.requestService.createGetRequestHeader(projectId, 'getUsersByProjectId');
    }

    updateProjectUsers(projectId: string, user: User) {
        let requestObejct = {
            projectId: projectId,
            userId: user._id
        }
        return this.requestService.createPutRequestHeader(requestObejct, 'removeProjectUser');
    }

    addUserToProject(projectId: string, user: User) {
        let requestObejct = {
            projectId: projectId,
            userId: user._id
        }

        return this.requestService.createPutRequestHeader(requestObejct, 'addUserToProject');
    }
}