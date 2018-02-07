
export class Message {
    _id: string;
    author: string;
    text: string;
    chatID: string;
    
    constructor(author: string, text: string, chatID: string) {
        this.author = author;
        this.text = text;
        this.chatID = chatID;
    }
}