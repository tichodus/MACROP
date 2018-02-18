import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../../services/task.services';

@Component({
  selector: 'empty-task',
  templateUrl: './empty-task.component.html',
  styleUrls: ['./empty-task.component.css']
})
export class EmptyTaskComponent implements OnInit {
  @Input() projectId: string;
  @Input() projectOwner: string;
  @Output() taskCreated: EventEmitter<any>;
  constructor(private taskService: TaskService) {
    this.taskCreated = new EventEmitter();
  }

  ngOnInit() {
  }

  createTask(taskName: HTMLInputElement, subTask: HTMLInputElement) {

    if (taskName.value) {
      this.taskService.createTask(taskName.value, subTask.value, this.projectId, this.projectOwner);
      this.taskCreated.emit(null);
    }
    else
      this.taskCreated.emit(null);
  }
}
