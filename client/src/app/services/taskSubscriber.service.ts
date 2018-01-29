import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";

@Injectable()
export class TaskSubscriber {
    taskSubscriber: Subject<any>;

    update(data) {
        this.taskSubscriber.next(data);
    }
}