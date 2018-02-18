import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RequestService } from '../../services/requestService.service';

@Component({
  selector: 'empty-task',
  templateUrl: './empty-task.component.html',
  styleUrls: ['./empty-task.component.css']
})
export class EmptyTaskComponent implements OnInit {
  @Input() projectId: string;
  @Input() projectOwner: string;
  @Output() taskCreated: EventEmitter<any>;
  constructor(private requestService: RequestService) {
    this.taskCreated = new EventEmitter();
  }

  ngOnInit() {
  }

  createTask(taskName: HTMLInputElement, subTask: HTMLInputElement) {
    if (taskName.value) {
      let data;
      if (!subTask.value)
        data = this._createRequestObject(taskName.value, this.projectId, [this.projectOwner], [], []);
      else
        data = this._createRequestObject(taskName.value, this.projectId, [this.projectOwner], [subTask.value], ['paused']);
      this.requestService.createPostRequestHeader(data, 'createTask').subscribe(res => console.log(res));
      this.taskCreated.emit(null);
    }
    else
      this.taskCreated.emit(null);

  }

  _createRequestObject(taskName: string, projectId: string, responsible: Array<string>, body: Array<string>, completness: Array<string>) {
    return {
      name: taskName,
      projectID: projectId,
      responsible: responsible,
      body: body,
      completness: completness
    }
  }
}
