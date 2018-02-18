import { User } from "./user";
import { Completness } from './enums/Completness'
//this needs to be remodeled 
export class Task {
    _id: string;
    name: string;
    body: Array<string>;
    projectID: string;
    responsible: Array<string>;
    completness: Array<string>;
    
    constructor(id: string, name: string, body: Array<string>, projectID: string, responsible: Array<string>,completness:Array<string>) {
        this._id = id;
        this.name = name;
        this.body = body;
        this.projectID = projectID;
        this.responsible = responsible;
        this.completness = completness;
    }
}