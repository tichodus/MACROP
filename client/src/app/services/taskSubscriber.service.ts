import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";

@Injectable()
export class TaskSubscriber {
    taskSubscriber: Subject<any>;
    constructor() {
        this.taskSubscriber = new Subject();
    }
    update(data) {
        this.taskSubscriber.next(data);
    }
}