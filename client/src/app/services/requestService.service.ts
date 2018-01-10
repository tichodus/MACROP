import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class RequestService {

    constructor(private http: Http) { }

    createPostRequestHeader(data: any, action: string) {
        let header = new Headers();
        header.append("Content-Type", "application/json");
        return this.http.post("http://localhost:3000/api/" + action, JSON.stringify(data), { headers: header });
    }

    createGetRequestHeader(data: string, action: string) {
        if (!data || typeof data == 'undefined')
            data = '';
        let header = new Headers();
        header.append("Content-Type", "application/json");
        return this.http.get("http://localhost:3000/api/" + action + '/' + data, { headers: header });
    }
}