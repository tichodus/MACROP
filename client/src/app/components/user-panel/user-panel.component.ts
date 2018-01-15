import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserSession } from '../../services/userSession.service';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ProjectSubscriber } from '../../services/projectSubscriber.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  user: User;
  projects: Array<Project>;
  constructor(private projectSubscriber: ProjectSubscriber, private projectService: ProjectService) {
    this.user = <User>JSON.parse(UserSession.getUserFromStorage());
    this.projectSubscriber.projectSubscriber.subscribe((data: Project) => {
      console.log(data);
      let alreadyExists: boolean = this.projects.findIndex(project => project._id == data._id) != -1 ? true : false;
      let isOwner: boolean = data.owners.findIndex(id => this.user._id == id) !== -1 ? true : false;
      let isParticipant: boolean = data.participians.findIndex(id => this.user._id == id) !== -1 ? true : false;

      if (!alreadyExists && (isOwner || isParticipant))
        this.projects.push(data);
    });
  }

  ngOnInit() {
    this.projectService.getProjectsByUserId(this.user._id).subscribe(result => {
      this.projects = result.json();
    });
  }

}
