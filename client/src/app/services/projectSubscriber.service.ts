import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { EventListener } from "@angular/core/src/debug/debug_node";
import { EventSource } from 'eventsource'
import * as Socket from 'socket.io-client';

@Injectable()
export class ProjectSubscriber {
    projectSubscriber: Subject<any>;

    constructor() {
        this.projectSubscriber = new Subject<any>();


    }

    update(data) {
        this.projectSubscriber.next(data);
    }
}