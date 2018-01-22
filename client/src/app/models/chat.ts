
export class Chat {
    _id: string;
    participians: Array<string>;
    
    constructor(id: string, participians: Array<string>) {
        this._id = id;
        this.participians = participians;
    }
}