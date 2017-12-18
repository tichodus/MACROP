import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Http, Headers } from "@angular/http";



@Injectable()
export class UsersService {
    constructor(private http: Http) { }

    login(user: User) {
        let header =  new Headers();
        header.append("Content-Type","application/json");
        return this.http.post("http://localhost:3000/api/login",JSON.stringify(user),{headers:header});
    }


    validate(user: User) {
        if (!user) return false;
        return true;
    }   

    register(user:User){
        let header =  new Headers();
        header.append("Content-Type","application/json");
        return this.http.post("http://localhost:3000/api/register",JSON.stringify(user),{headers:header});
    }

}