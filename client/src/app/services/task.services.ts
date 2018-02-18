import { Injectable } from "@angular/core";
import { RequestService } from "./requestService.service";
import { Task } from "../models/task";

@Injectable()
export class TaskService {

    constructor(private requestService: RequestService) { }

    updateTask(task: Task) {
        if (!task || typeof Task == 'undefined')
            throw Error("Task must be defined");
        return this.requestService.createPutRequestHeader(task, 'updateTask');
    }


}