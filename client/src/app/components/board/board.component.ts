import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UserSession } from '../../services/userSession.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() id: string;
  @Input() role: string;
  private _picture: string;
  private _numberOfTasks: number;
  private _isClicked: boolean;
  private _project: Project;
  private _userID: string;
  constructor(private projectService: ProjectService, private router: Router) {
    this._userID = JSON.parse(UserSession.getUserFromStorage())._id;
    this._picture = '';
    this._numberOfTasks = 0;
    this._isClicked = false;
  }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.projectService.getProjectById(this.id).subscribe(res => {
      this._project = res.json();
    });
  }
  isUserOwner() {
    let user: User = JSON.parse(UserSession.getUserFromStorage());
    let isOwner: boolean = false;
    this._project.owners.forEach(owner => {
      if (owner == user._id)
        isOwner = true;
    });
    return isOwner;
  }

  openProject() {
    document.getElementById("main").className = "transition";
    console.log(this.role);
    this.router.navigate(['/taskBoard', this.id], { queryParams: { role: this.role || 'owner', userID: this._userID, isUserProjectOwner: this.isUserOwner() } });
  }

}
