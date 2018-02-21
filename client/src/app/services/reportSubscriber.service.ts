import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ReportSubscriberService {
    data: Subject<any>;

    constructor() {
        this.data = new Subject();
    }

    update(data) {
        this.data.next(data);
    }

}