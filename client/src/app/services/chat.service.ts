import { Injectable } from "@angular/core";
import { RequestService } from "./requestService.service";

@Injectable()
export class ChatService {
    constructor(private requestService: RequestService) { }

    getMessagesForProject(projectID: string) {
        return this.requestService.createGetRequestHeader(projectID, 'getChat');
    }

}