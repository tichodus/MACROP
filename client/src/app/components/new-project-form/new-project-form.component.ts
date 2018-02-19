import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { UserSession } from '../../services/userSession.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { RequestService } from '../../services/requestService.service';
import * as Socket from 'socket.io-client';
import { ProjectSubscriber } from '../../services/projectSubscriber.service';
import { Router } from '@angular/router';
import { Roles } from '../../models/enums/roles';

@Component({
  selector: 'app-new-project-form',
  templateUrl: './new-project-form.component.html',
  styleUrls: ['./new-project-form.component.css']
})
export class NewProjectFormComponent implements OnInit {
  loggedUser: User;
  users: Array<User>;
  participans: Array<User>;
  projectName: string;
  errorFlag: boolean;
  roles: Array<any>;
  rolesKeys: Array<any>;
  Roles;
  private socket;
  constructor(private userService: UsersService, private requestService: RequestService, private router: Router) {
    this.participans = new Array<User>();
    this.loggedUser = JSON.parse(UserSession.getUserFromStorage());
    this.errorFlag = false;

    this.roles = this.roleEnumToArray();

    this.rolesKeys = Object.keys(this.roles);

  }

  roleEnumToArray() {
    let keys = Object.keys(Roles);
    let values = [];
    keys.forEach(key => values[key] = Roles[key]);
    return values;
  }

  createProject(name: string) {
    let projectName = name;
    if (!projectName || typeof projectName == 'undefined' || projectName == '' || this.participans.length == 0) {
      this.errorFlag = true;
      return;
    }
    let project = this.createRequestObject(projectName);
    this.requestService.createPostRequestHeader(project, 'createProject').subscribe((res) => {
      console.log(res);
      this.router.navigate(['userPanel']);
    });

  }

  removeParticipant(user: User) {
    let index = this.participans.indexOf(user);
    this.participans = this.participans.filter(participant => participant._id != user._id);
  }

  createRequestObject(name: string) {
    let participans: Array<string> = new Array<string>();
    this.participans.forEach(participant => participans.push(participant._id));
    return {
      ownerId: [this.loggedUser._id],
      participians: this.participans,
      projectName: name
    }
  }
  isUserParticipant(user: User) {
    let isParticipant: boolean = false;
    this.participans.forEach(participant => {
      if (participant._id == user._id)
        isParticipant = true;
    });
    return isParticipant;
  }

  addParticipant(user: User, role: string) {
    if (!user || this.isUserParticipant(user))
      return;
    user.role = role;
    this.participans.push(user);
    console.log(this.participans);
  }
  ngOnInit() {

    this.userService.getAllUsers().subscribe(usersAsJson => {
      if (usersAsJson.json())
        this.users = usersAsJson.json();
      this.users = this.users.filter(user => user._id != this.loggedUser._id);
    })

  }

}