import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserSession } from '../../services/userSession.service';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  user: User;
  projects: Array<Project>;
  constructor(private projectService: ProjectService) {
    this.user = <User>JSON.parse(UserSession.getUserFromStorage());

  }

  ngOnInit() {
    this.projectService.getProjectsByUserId(this.user._id).subscribe(result => {
      this.projects = result.json();
    });
  }

}
