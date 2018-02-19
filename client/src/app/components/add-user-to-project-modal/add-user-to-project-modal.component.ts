import { Component, OnInit, Input, ViewRef, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { User } from '../../models/user';
import { Project } from '../../models/project';
import { UsersService } from '../../services/users.service';
import { UserModalDialogComponent } from '../user-modal-dialog/user-modal-dialog.component';


@Component({
  selector: 'add-user-to-project-modal',
  templateUrl: './add-user-to-project-modal.component.html',
  styleUrls: ['./add-user-to-project-modal.component.css']
})
export class AddUserToProjectModalComponent extends UserModalDialogComponent implements OnInit {
  @Input() projectId: string;
  @ViewChild("addUserModal") modalRef;

  private _usersOnProject: Array<User>;

  constructor(private projectService: ProjectService, private userService: UsersService) {
    super();
  }

  protected initUsers() {
    this.projectService.getUsersOnProject(this.projectId).subscribe(users => {
      this._usersOnProject = users.json();
      this.userService.getAllUsers().subscribe(allUsers => {
        this._users = allUsers.json();
        this._users = this._users.filter(user => this._usersOnProject.findIndex(_user => _user._id == user._id) == -1);
      });
    });
  }

  protected userAction(user: User) {
    this._usersOnProject.push(user);
    this._users = this._users.filter(_user => _user._id != user._id);
    this.projectService.addUserToProject(this.projectId, user).subscribe(() => {
      this.emitEvent(this._usersOnProject);
    });

  }

  public open() {
    this._open(this.modalRef);
  }

  update(user:User){
    this._users.push(user);
  }

}



