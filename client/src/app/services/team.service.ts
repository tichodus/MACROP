import { RequestService } from "./requestService.service";
import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable()
export class TeamService {

    constructor(private requestService: RequestService) { }

    createTeam(teamObject) {
        return this.requestService.createPostRequestHeader(teamObject, 'createTeam');
    }

    getProjectTeams(projectId) {
        return this.requestService.createGetRequestHeader(projectId, 'getProjectTeams');
    }

    getTeamByLeaderId(leaderId: string, projectId: string) {
        let reqObj = {
            leaderId: leaderId,
            projectId: projectId
        };

        return this.requestService.createPostRequestHeader(reqObj, 'getTeamByLeaderId');
    }

    addUserToTeam(user: User, teamId: string) {
        let reqObject = {
            user: user,
            teamId: teamId
        };

        return this.requestService.createPostRequestHeader(reqObject, 'addUserToTeam');
    }

}