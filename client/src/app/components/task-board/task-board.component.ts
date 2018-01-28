import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  private _userID: string;
  private _isProjectOwner: boolean;
  private _projectId: string;
  private _tasks: Array<Task>;
  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      this._isProjectOwner = res.isProjectOwner;
    });
    this.activatedRoute.params.subscribe(res => {
      this._projectId = res.id;
      this.projectService.getProjectTasks(this._projectId).subscribe(tasks => {
        this._tasks = tasks.json();
        // filter tasks so array should consists only from tasks for the specified user
        this._tasks = this._tasks.filter(task => {
          task.responsible.findIndex(responsibleID => responsibleID == this._userID) !== -1
        });
      })
    });

  }

}
