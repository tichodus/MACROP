import { User } from "../models/user";
import { Observable } from "rxjs/Observable";
import { UsersService } from "./users.service";



export class UserSession {


    static toLocalDataStorage(user: User) {
        if (!this.validate(user))
            throw Error("Object must be typeof User");
        window.localStorage.setItem('activeUserSession', JSON.stringify(user));
    }

    static validate(user: User) {
        if (!user) return false;
        return true;
    }

    static isValidResponse(userAsResponse) {
        if (!userAsResponse || !userAsResponse.json())
            return false;
        else return true;
    }

    static getUserFromStorage() {
        if (UserSession.isLogged())
            return window.localStorage.getItem('activeUserSession');
        return null;
    }
    static isLogged() {
        return window.localStorage.getItem('activeUserSession') ? true : false;
    }

}