
export class Chat {
    _id: string;
    projectID: string;

    constructor(id: string, projectID: string) {
        this._id = id;
        this.projectID = projectID;
    }
}