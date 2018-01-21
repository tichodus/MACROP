import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { EventListener } from "@angular/core/src/debug/debug_node";
import { EventSource } from 'eventsource'
import * as Socket from 'socket.io-client';

@Injectable()
export class ChatSubscriber {
    chatSubscriber: Subject<any>;

    constructor() {
        this.chatSubscriber = new Subject<any>();


    }

    update(data) {
        this.chatSubscriber.next(data);
    }
}