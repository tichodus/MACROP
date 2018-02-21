import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserModalDialogComponent } from '../user-modal-dialog/user-modal-dialog.component';
import { User } from '../../models/user';
import { TeamService } from '../../services/team.service';
import { ProjectService } from '../../services/project.service';
import { Team } from '../../models/team';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { UserSession } from '../../services/userSession.service';

@Component({
  selector: 'create-team-modal',
  templateUrl: './create-team-modal.component.html',
  styleUrls: ['./create-team-modal.component.css']
})
export class CreateTeamModalComponent extends UserModalDialogComponent {
  @ViewChild("createTeamModal") modalRef;
  @Input() projectId: string;
  private _team: Team;
  private _teamLeaderId: string;
  private _teams: Array<Team>;
  private _availableUsers: Array<User>;
  private _roles: Array<Role>;
  private _user: User;
  private _usersOnTask: Array<User>;
  constructor(private teamService: TeamService, private projectService: ProjectService) {
    super();
    this._availableUsers = new Array();
    this._usersOnTask = new Array();
    this._team = new Team();
  }


  protected initUsers() {
    this._user = JSON.parse(UserSession.getUserFromStorage());
    this.projectService.getUsersOnProject(this.projectId).subscribe(users => {
      this._users = users.json();

      this.projectService.getRolesForProject(this.projectId).subscribe(roles => {
        this._roles = roles.json();
      });
      console.log(this.projectId);
      this.teamService.getProjectTeams(this.projectId).subscribe(teams => {
        this._teams = teams.json();
        let usersInTeams: Array<User> = new Array();

        this._users.forEach(user => this._teams.forEach(team => {
          if (team.members.findIndex(userId => userId == user._id) != -1)
            usersInTeams.push(user);
        }));

        this._availableUsers = this._users.filter(user => usersInTeams.findIndex(_user => _user._id == user._id) == -1 && this._user._id != user._id);

        console.log(this.getRoleForSpecificUser(this._user));
      });
    });
  }
  protected userAction(user: User) {
    if (this.getRoleForSpecificUser(user) == 'Team Leader')
      this._teamLeaderId = user._id;
    else {
      this._team.members.push(user._id);
    }
    this._availableUsers = this._availableUsers.filter(_user => _user._id != user._id);
  }

  private createTeam(teamName: string) {
    this._team.name = teamName;
    this._team.projectId = this.projectId;
    this._team.leaderId = this._teamLeaderId;
    this._team.tasks = [];

    this.teamService.createTeam(this._team).subscribe(res => console.log(res.json()));
  }
  public open() {
    this._open(this.modalRef);
  }
  protected update($event: any) {
    throw new Error("Method not implemented.");
  }

  getRoleForSpecificUser(user: User) {
    if (this._roles) {
      let role = this._roles.find(role => role.userID == user._id);
      let roleArray = RoleService.roleEnumToArray();

      return role ? roleArray[role.role] : null;
    }
  }
}
