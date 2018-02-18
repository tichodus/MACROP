import { Component, OnInit, Input, ViewRef, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { User } from '../../models/user';
import { Project } from '../../models/project';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'add-user-to-project-modal',
  templateUrl: './add-user-to-project-modal.component.html',
  styleUrls: ['./add-user-to-project-modal.component.css']
})
export class AddUserToProjectModalComponent implements OnInit {
  @Input() projectId: string;
  @ViewChild("addUserModal") modalRef;

  private _usersOnProject: Array<User>;
  private _allUsers: Array<User>;
  constructor(private projectService: ProjectService, private userService: UsersService) {
  }

  ngOnInit() {
    this.projectService.getUsersOnProject(this.projectId).subscribe(users => {
      this._usersOnProject = users.json();
      this.userService.getAllUsers().subscribe(users => {
        this._allUsers = users.json();
        this._allUsers = this._allUsers.filter(user => this._usersOnProject.findIndex(_user => _user._id == user._id) == -1);
      });
    });
  }

  open() {
    this.modalRef.open();
  }

  addUser(user: User) {
    this._usersOnProject.push(user);
    this.projectService.addUserToProject(this.projectId, user).subscribe();
  }

}



