import { User } from "./user";

//this needs to be remodeled 
export class Task {
    _id: string;
    name: string;
    body: string;
    projectID: string;
    responsible: Array<User>;

    constructor(id: string, name: string, body: string, projectID: string, responsible: Array<User>) {
        this._id = id;
        this.name = name;
        this.body = body;
        this.projectID = projectID;
        this.responsible = responsible;
    }
}