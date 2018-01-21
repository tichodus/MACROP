import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class RequestService {

    private _server:string;
    private _localServer:string;
    private _deployedServer:string;
    constructor(private http: Http) {
        this._localServer = 'http://localhost:3000/api/';
        this._deployedServer = 'https://macrop.herokuapp.com/api/';
        this._server = this._localServer;
     }

    createPostRequestHeader(data: any, action: string) {
        let header = new Headers();
        header.append("Content-Type", "application/json");
        return this.http.post(this._server + action, JSON.stringify(data), { headers: header });
    }

    createGetRequestHeader(data: string, action: string) {
        if (!data || typeof data == 'undefined')
            data = '';
        let header = new Headers();
        header.append("Content-Type", "application/json");
        return this.http.get(this._server + action + '/' + data, { headers: header });
    }
}