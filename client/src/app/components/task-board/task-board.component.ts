import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task';
import { ProjectService } from '../../services/project.service';
import { Completness } from '../../models/enums/completness';
import { TaskService } from '../../services/task.services';
import { TaskSubscriber } from '../../services/taskSubscriber.service';

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
  constructor(private taskSubscriber: TaskSubscriber, private activatedRoute: ActivatedRoute, private projectService: ProjectService, private taskService: TaskService) {
    this.taskSubscriber.taskSubscriber.subscribe((task: Task) => {
      console.log(task);
      let alreadyExists = false;
      this._tasks.forEach(_task => {
        if (task._id == _task._id)
          alreadyExists = true;
      });

      if (alreadyExists) {
        let taskIndex = this._tasks.findIndex(_task => task._id == _task._id);
        this._tasks.splice(taskIndex, 1, task);
      }
      else
        this._tasks.push(task);

    });
  }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      this._isProjectOwner = res.isProjectOwner;
      this._userID = res.userID;
    });
    this.activatedRoute.params.subscribe(res => {
      this._projectId = res.id;

      this.projectService.getProjectTasks(this._projectId).subscribe(tasks => {
        this._tasks = tasks.json();
        console.log(this._tasks);
        // filter tasks so array should consists only from tasks for the specified user
        this._tasks = this._tasks.filter((task: Task) => task.responsible.includes(this._userID));
        console.log(this._tasks);
      });
    });
  }

  setTaskFinished(task: Task) {
    task.completness = 'finished';
    console.log(task);
    this.taskService.updateTask(task).subscribe();
  }

  setTaskWorking(task: Task) {
    task.completness = 'working';
    this.taskService.updateTask(task).subscribe();
  }

  setTaskPaused(task: Task) {
    task.completness = 'paused';
    this.taskService.updateTask(task).subscribe();
  }
}
