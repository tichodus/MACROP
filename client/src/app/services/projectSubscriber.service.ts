import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { EventListener } from "@angular/core/src/debug/debug_node";
import { EventSource } from 'eventsource'
import * as Socket from 'socket.io-client';

@Injectable()
export class ProjectSubscriber {
    projectSubscriber: Subject<any>;
    userRemovedFromProject: Subject<any>;
    constructor() {
        this.projectSubscriber = new Subject<any>();
        this.userRemovedFromProject = new Subject();
    }

    update(data) {
        this.projectSubscriber.next(data);
    }

    updateRemovedUser(data) {
        this.userRemovedFromProject.next(data);
    }
}