import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";

@Injectable()
export class TaskSubscriber {
    taskSubscriber: Subject<any>;
    taskToAddUser: Subject<any>;
    constructor() {
        this.taskSubscriber = new Subject();
        this.taskToAddUser = new Subject();
    }
    update(data) {
        this.taskSubscriber.next(data);
    }
    updateTaskForUsersAddition(data) {
        this.taskToAddUser.next(data);
    }
}