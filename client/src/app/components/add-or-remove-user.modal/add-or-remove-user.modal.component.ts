import { Component, OnInit, Input, ViewRef, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { User } from '../../models/user';
import { Project } from '../../models/project';
import { UsersService } from '../../services/users.service';
import { UserModalDialogComponent } from '../user-modal-dialog/user-modal-dialog.component';


@Component({
  selector: 'add-or-remove-user-modal',
  templateUrl: './add-or-remove-user.modal.component.html',
  styleUrls: ['./add-or-remove-user.modal.component.css']
})
export class AddOrRemoveUserModalComponent extends UserModalDialogComponent implements OnInit {
  @Input() projectId: string;
  @ViewChild("removeUserModal") modalRef;


  constructor(private projectService: ProjectService, private userService: UsersService) {
    super();
  }

  open() {
    this._open(this.modalRef);
  }

  protected initUsers() {
    this.projectService.getUsersOnProject(this.projectId).subscribe(users => {
      this._users = users.json();
    });
  }
  protected userAction(user: User) {
    this._users = this._users.filter(_user => _user._id != user._id);
    this.projectService.updateProjectUsers(this.projectId, user).subscribe(() => {
      this.emitEvent(user);
    });
  }

  update(usersOnProject: Array<User>) {
    this._users = usersOnProject;
  }





}
