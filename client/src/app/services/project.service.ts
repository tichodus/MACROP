import { Injectable } from "@angular/core";
import { RequestService } from "./requestService.service";

@Injectable()
export class ProjectService {
    constructor(private requestService: RequestService) { }

    getProjectsByUserId(userID: string) {
        return this.requestService.createGetRequestHeader(userID, 'getProjects');
    }

    getProjectById(projectID: string) {
        return this.requestService.createGetRequestHeader(projectID, 'getProject');
    }
}