import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UserSession } from '../../services/userSession.service';
import { User } from '../../models/user';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() id: string;
  _picture: string;
  _numberOfTasks: number;
  _isClicked: boolean;
  project: Project;
  constructor(private projectService: ProjectService) {
    this._picture = '';
    this._numberOfTasks = 0;
    this._isClicked = false;
  }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.projectService.getProjectById(this.id).subscribe(res => {
      this.project = res.json();
    });
  }
  isUserOwner() {
    let user: User = JSON.parse(UserSession.getUserFromStorage());
    let isOwner: boolean = false;
    this.project.owners.forEach(owner => {
      if (owner == user._id)
        isOwner = true;
    });
    return isOwner;
  }


}
