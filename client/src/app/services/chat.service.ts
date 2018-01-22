import { Injectable } from "@angular/core";
import { RequestService } from "./requestService.service";

@Injectable()
export class ChatService {
    constructor(private requestService: RequestService) { }

    getUserByUserId(userID: string) {
        return this.requestService.createGetRequestHeader(userID, 'getUser');
    }

    getChatByUserId(userID: string) {
        return this.requestService.createGetRequestHeader(userID, 'getUserChats');
    }

    getChatByForUserId(userID: string, otherUserId: string) {
        let obj = {
            "userID": userID,
            "otherUserId": otherUserId
        };
        return this.requestService.createPostRequestHeader(JSON.stringify(obj), 'getUserChatsWithUser');
    }
}