import { User } from "./user";
import { Report } from "./report/report";

//this needs to be remodeled 
export class Project {
    _id: string;
    owners: Array<string>;
    participians: Array<string>;
    tasks: Array<string>;
    name: string;
    reports:Array<Report>;
    
    constructor(id: string, owners: Array<string>, participians: Array<string>, tasks: Array<string>, name: string) {
        this._id = id;
        this.owners = owners;
        this.participians = participians;
        this.tasks = tasks;
        this.name = name || '';
    }
}