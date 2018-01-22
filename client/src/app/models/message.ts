
export class Message {
    _id: string;
    author: string;
    text: string;
    chatID: string;
    
    constructor(id: string, author: string, text: string, chatID: string) {
        this._id = id;
        this.author = author;
        this.text = text;
        this.chatID = chatID;
    }
}