import { Injectable } from "@angular/core";
import { RequestService } from "./requestService.service";
import { Message } from "../models/message";

@Injectable()
export class ChatService {
    constructor(private requestService: RequestService) { }

    getMessagesForProject(projectID: string) {
        return this.requestService.createGetRequestHeader(projectID, 'getChatMessages');
    }

    getProjectChatById(id:string){
        return this.requestService.createGetRequestHeader(id,'getChat');
    }

    sendMessage(message:Message){
        return this.requestService.createPostRequestHeader(message,'createMessage');
    }
}