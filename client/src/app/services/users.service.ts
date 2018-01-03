import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { UserSession } from "./userSession.service";



@Injectable()
export class UsersService {
    constructor(private http: Http) { }

    createRequestHeader(user: User) {
        let header = new Headers();
        header.append("Content-Type", "application/json");
        return this.http.post("http://localhost:3000/api/login", JSON.stringify(user), { headers: header });
    }


    login(user: User) {
        if (!UserSession.validate(user)) throw Error("Bad request, wrong input data");
        return this.createRequestHeader(user);
    }


    register(user: User) {
        let header = new Headers();
        header.append("Content-Type", "application/json");
        return this.http.post("http://localhost:3000/api/register", JSON.stringify(user), { headers: header });
    }



}