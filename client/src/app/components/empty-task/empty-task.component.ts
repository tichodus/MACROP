import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from '../../services/requestService.service';

@Component({
  selector: 'empty-task',
  templateUrl: './empty-task.component.html',
  styleUrls: ['./empty-task.component.css']
})
export class EmptyTaskComponent implements OnInit {
  @Input() projectId: string;
  @Input() projectOwner: string;
  constructor(private requestService: RequestService) {

  }

  ngOnInit() {
  }

  createTask(taskName: HTMLInputElement, subTask: HTMLInputElement) {
    let data = this._createRequestObject(taskName.value, this.projectId, [this.projectOwner], [subTask.value]);
    this.requestService.createPostRequestHeader(data, 'createTask').subscribe(res => console.log(res));
  }

  _createRequestObject(taskName: string, projectId: string, responsible: Array<string>, body: Array<string>) {
    return {
      name: taskName,
      projectID: projectId,
      responsible: responsible,
      body: body
    }
  }
}
