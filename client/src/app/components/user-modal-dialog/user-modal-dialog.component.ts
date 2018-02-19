import { User } from "../../models/user";
import { OnInit, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";


export abstract class UserModalDialogComponent implements OnInit {

    @Output() protected userActionEvent: EventEmitter<any>;
    protected _users: Array<User>;
    protected _modalDialog;
    constructor() {
        this.userActionEvent = new EventEmitter();
    }

    ngOnInit(): void {
        this.initUsers();
    }

    protected _open(modalDialog) {
        modalDialog.open();
    }

    protected abstract initUsers();
    protected abstract userAction(user: User);

    protected onUserActionHandler(user: User) {
        this.userAction(user);
    }

    protected setModalDialog(modalDialog) {
        this._modalDialog = modalDialog;
    }

    public abstract open();

    protected emitEvent(data: any) {
        this.userActionEvent.emit(data);
    }

    protected abstract update($event);
}