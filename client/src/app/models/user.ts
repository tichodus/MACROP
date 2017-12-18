
export class User {
    email:String;
    username: String;
    password: String;

    constructor(username: String, password: String,email?:String) {
        if (!username || !password || typeof username === 'undefined' || typeof password === 'undefined') throw Error("Invalid values for username or password");
        this.username = username;
        this.password = password;
        this.email = email;
    }

}