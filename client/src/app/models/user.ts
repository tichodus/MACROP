
export class User {
    _id: string;
    email: string;
    username: string;
    password: string;
    role: string;

    constructor(username: string, password: string, email?: string , id?: string, role?: string) {
        if (!username || !password || typeof username === 'undefined' || typeof password === 'undefined') throw Error("Invalid values for username or password");
        this.username = username;
        this.password = password;
        this.email = email || '';
        this._id = id || '';
        this.role = role || null;
    }



}