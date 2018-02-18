import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task';
import { ProjectService } from '../../services/project.service';
import { Completness } from '../../models/enums/completness';
import { TaskService } from '../../services/task.services';
import { TaskSubscriber } from '../../services/taskSubscriber.service';
import 'ng2-dnd/bundles/style.css';
import { ProjectSubscriber } from '../../services/projectSubscriber.service';
import { Location } from '@angular/common';

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
  private _sidebarOpened: boolean;
  private _createTask: boolean;
  constructor(private location:Location,private taskSubscriber: TaskSubscriber, private activatedRoute: ActivatedRoute, private projectService: ProjectService, private taskService: TaskService, private projectSubscriber: ProjectSubscriber, private router: Router) {
    this._sidebarOpened = false;
    this._isProjectOwner = false;
    this._createTask = false;
    this.taskSubscriber.taskSubscriber.subscribe((task: Task) => {
      let alreadyExists = false;
      console.log(task);
      this._tasks.forEach(_task => {
        if (task._id == _task._id)
          alreadyExists = true;
      });

      if (alreadyExists) {
        let taskIndex = this._tasks.findIndex(_task => task._id == _task._id);
        this._tasks.splice(taskIndex, 1, task);
      }
      else {
        if (task.responsible.findIndex(userID => userID == this._userID) != -1)
          this._tasks.push(task);
      }
    });
    this.projectSubscriber.userRemovedFromProject.subscribe(userId => {
      console.log(userId);
      if (userId == this._userID)
        this.location.back();
    });
  }


  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(res => {
      this._isProjectOwner = res.isUserProjectOwner;
      console.log(this._isProjectOwner);
      this._userID = res.userID;
    });

    this.activatedRoute.params.subscribe(res => {
      this._projectId = res.id;

      this.projectService.getProjectTasks(this._projectId).subscribe(tasks => {
        this._tasks = tasks.json();

        // filter tasks so array should consists only from tasks for the specified user
        this._tasks = this._tasks.filter((task: Task) => task.responsible.includes(this._userID));

      });
    });
  }

  setTaskFinished(task: Task, subTaskIndex: number) {
    console.log(subTaskIndex);
    task.completness[subTaskIndex] = 'finished';
    console.log(task);
    this.taskService.updateTask(task).subscribe();
  }

  setTaskWorking(task: Task, subTaskIndex: number) {
    task.completness[subTaskIndex] = 'working';
    this.taskService.updateTask(task).subscribe();
  }

  setTaskPaused(task: Task, subTaskIndex: number) {
    task.completness[subTaskIndex] = 'paused';
    this.taskService.updateTask(task).subscribe();
  }

  transferDataSuccess($event) {
    console.log($event);
  }

  openSidebar(sidebar) {
    sidebar.openNav();
    this._sidebarOpened = true;
  }

  addSubtask($event: KeyboardEvent, task: Task, subtask: string) {
    if ($event.keyCode == 13) {
      if (!$event.shiftKey) {
        task.body.push(subtask);
        task.completness.push('paused');
        this.taskService.updateTask(task).subscribe();
        subtask = '';
      }
    }
  }
}
