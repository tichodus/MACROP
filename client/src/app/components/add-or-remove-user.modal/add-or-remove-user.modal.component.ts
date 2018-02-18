import { Component, OnInit, Input, ViewRef, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { User } from '../../models/user';
import { Project } from '../../models/project';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'add-or-remove-user-modal',
  templateUrl: './add-or-remove-user.modal.component.html',
  styleUrls: ['./add-or-remove-user.modal.component.css']
})
export class AddOrRemoveUserModalComponent implements OnInit {
  @Input() projectId: string;
  @ViewChild("removeUserModal") modalRef;
  @Output() closed: EventEmitter<any>;

  private _usersOnProject: Array<User>;
  constructor(private projectService: ProjectService, private userService: UsersService) {
    this.closed = new EventEmitter();
  }

  ngOnInit() {
    this.projectService.getUsersOnProject(this.projectId).subscribe(users => {
      this._usersOnProject = users.json();
    });
  }

  open() {
    this.modalRef.open();
  }

  removeUser(user: User) {
    this._usersOnProject = this._usersOnProject.filter(_user => _user._id != user._id);
    this.projectService.updateProjectUsers(this.projectId, user).subscribe();
  }

}
