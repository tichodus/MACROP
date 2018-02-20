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

    createTask(taskName: string, subTask: string, projectId: string, projectOwner: string) {
        if (!taskName)
            throw Error("Taskname must be defined!");

        let data;
        if (!subTask)
            data = this._createRequestObject(taskName, projectId, [projectOwner], [], []);
        else
            data = this._createRequestObject(taskName, projectId, [projectOwner], [subTask], ['paused']);
        this.requestService.createPostRequestHeader(data, 'createTask').subscribe(res => console.log(res));

    }

    _createRequestObject(taskName: string, projectId: string, responsible: Array<string>, body: Array<string>, completness: Array<string>) {
        return {
            name: taskName,
            projectID: projectId,
            responsible: responsible,
            body: body,
            completness: completness
        }
    }

    


}