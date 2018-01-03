import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { UserSession } from "./userSession.service";


@Injectable()

export class UserSessionSubject {
    user: Subject<any> = new Subject();

    update() {
        if (UserSession.getUserFromStorage())
            this.user.next(UserSession.getUserFromStorage());
    }
}