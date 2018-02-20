import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { UserSession } from "./userSession.service";
import { RequestService } from "./requestService.service";



@Injectable()
export class UsersService {
    constructor(private requestService: RequestService) { }




    login(user: User) {
        if (!UserSession.validate(user)) throw Error("Bad request, wrong input data");
        return this.requestService.createPostRequestHeader(user, "login");
    }


    register(user: User) {
        return this.requestService.createPostRequestHeader(user, 'register');
    }

    getAllUsers() {
        return this.requestService.createGetRequestHeader(null, 'getAllUsers');
    }


    getRolesForUser(userId: string) {
        return this.requestService.createGetRequestHeader(userId, 'getRolesForUser');
    }

    getRoleForUser(userId: string, projectId: string) {
        let requestObject = {
            userId: userId,
            projectId: projectId
        }
        return this.requestService.createPostRequestHeader(requestObject, 'getRoleForUserOnProject');
    }

}