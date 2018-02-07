import { User } from "./user";

//this needs to be remodeled 
export class Project {
    _id: string;
    owners: Array<string>;
    participians: Array<string>;
    tasks: Array<string>;
    name: string;
    
    constructor(id: string, owners: Array<string>, participians: Array<string>, tasks: Array<string>, name: string) {
        this._id = id;
        this.owners = owners;
        this.participians = participians;
        this.tasks = tasks;
        this.name = name || '';
    }
}