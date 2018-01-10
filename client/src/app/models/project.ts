import { User } from "./user";

//this needs to be remodeled 
export class Project {
    _id: string;
    owners: Array<string>;
    participians: Array<string>;
    tasks: Array<string>;
    
    constructor(id: string, owners: Array<string>, participians: Array<string>, tasks: Array<string>) {
        this._id = id;
        this.owners = owners;
        this.participians = participians;
        this.tasks = tasks;
    }
}