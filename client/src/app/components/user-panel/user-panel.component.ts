import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ProjectSubscriber } from '../../services/projectSubscriber.service';
import { Role } from '../../models/role';
import { UsersService } from '../../services/users.service';
import { UserSession } from '../../services/userSession.service';
import { Roles } from '../../models/enums/roles';

@Component({
  selector: 'user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  page: number = 1;
  user: User;
  projects: Array<Project>;
  roles: Array<Role>;
  rolesAssoc:Array<any>;
  roleKeys: Array<any>;
  constructor(private projectSubscriber: ProjectSubscriber, private projectService: ProjectService, private userService: UsersService) {
    this.user = <User>JSON.parse(UserSession.getUserFromStorage());
    this.projectSubscriber.projectSubscriber.subscribe((data: Project) => {
      console.log(data);
      let alreadyExists: boolean = this.projects.findIndex(project => project._id == data._id) != -1 ? true : false;
      let isOwner: boolean = data.owners.findIndex(id => this.user._id == id) !== -1 ? true : false;
      let isParticipant: boolean = data.participians.findIndex(id => this.user._id == id) !== -1 ? true : false;

      if (!alreadyExists && (isOwner || isParticipant))
        this.projects.push(data);
    });

    this.projectSubscriber.userAddedToProject.subscribe((project: Project) => {
      console.log(project);
      if (project.participians.findIndex(userId => userId == this.user._id) != -1)
        this.projects.push(project);
    });

    this.rolesAssoc = this.roleEnumToArray();

    this.roleKeys = Object.keys(Roles);
  }

  ngOnInit() {
    this.projectService.getProjectsByUserId(this.user._id).subscribe(result => {
      this.projects = result.json();
      this.userService.getRolesForUser(this.user._id).subscribe(roles => {
        this.roles = roles.json();
      })
    });
  }

  getRoleForProject(project: Project) {
    let role = this.roles.find(role => role.projectID == project._id && role.userID == this.user._id);
    return role ? role.role : null;
  }

  roleEnumToArray() {
    let keys = Object.keys(Roles);
    let values = [];
    keys.forEach(key => values[key] = Roles[key]);
    return values;
  }

}
