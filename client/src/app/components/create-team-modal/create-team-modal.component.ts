import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserModalDialogComponent } from '../user-modal-dialog/user-modal-dialog.component';
import { User } from '../../models/user';
import { TeamService } from '../../services/team.service';
import { ProjectService } from '../../services/project.service';
import { Team } from '../../models/team';

@Component({
  selector: 'create-team-modal',
  templateUrl: './create-team-modal.component.html',
  styleUrls: ['./create-team-modal.component.css']
})
export class CreateTeamModalComponent extends UserModalDialogComponent {
  @ViewChild("createTeamModal") modalRef;
  @Input() projectId: string;

  private _teams: Array<Team>;
  private _availableUsers: Array<User>;
  constructor(private teamService: TeamService, private projectService: ProjectService) {
    super();
    this._availableUsers = new Array();
  }


  protected initUsers() {
    this.projectService.getUsersOnProject(this.projectId).subscribe(users => {
      this._users = users.json();
      this.teamService.getProjectTeams(this.projectId).subscribe(teams => {
        this._teams = teams.json();
        let usersInTeams: Array<User> = new Array();

        this._users.forEach(user => this._teams.forEach(team => {
          if (team.members.findIndex(userId => userId == user._id) != -1)
            usersInTeams.push(user);
        }));

        this._availableUsers = this._users.filter(user => usersInTeams.findIndex(_user => _user._id == user._id) == -1);

        console.log(this._availableUsers);
      });
    });
  }
  protected userAction(user: User) {
    throw new Error("Method not implemented.");
  }
  public open() {
    this._open(this.modalRef);
  }
  protected update($event: any) {
    throw new Error("Method not implemented.");
  }
}
