import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { User } from '../../models/user';
import { UserModalDialogComponent } from '../user-modal-dialog/user-modal-dialog.component';
import { ProjectService } from '../../services/project.service';
import { UsersService } from '../../services/users.service';
import { Task } from '../../models/task';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { TaskService } from '../../services/task.services';
import { TaskSubscriber } from '../../services/taskSubscriber.service';
import { UserSession } from '../../services/userSession.service';

@Component({
  selector: 'add-user-to-task-modal',
  templateUrl: './add-user-to-task-modal.component.html',
  styleUrls: ['./add-user-to-task-modal.component.css']
})
export class AddUserToTaskModalComponent extends UserModalDialogComponent implements OnInit {

  @Input() projectId: string;
  @Input() role: string;
  @ViewChild("addUserToTaskModal") modalRef;

  private _user: User;
  private _task: Task;
  private _roles: Array<Role>;

  constructor(private projectService: ProjectService, private userService: UsersService, private taskService: TaskService, private taskSubscriber: TaskSubscriber) {
    super();
    this._user = JSON.parse(UserSession.getUserFromStorage());
    this.taskSubscriber.taskSubscriber.subscribe((task: Task) => {
      if (task._id == this._task._id)
        this._task = task;
    });
  }

  protected initUsers() {
    this.projectService.getUsersOnProject(this.projectId).subscribe(users => {
      this._users = users.json();
      this.projectService.getRolesForProject(this.projectId).subscribe(roles => {
        this._roles = roles.json();
      });
    });

    return new Promise((resolve, reject) => { resolve() });
  }

  protected userAction(user: User) {
    this._task.responsible.push(user._id);
    this._users = this._users.filter(_user => _user._id != user._id);
    this.taskService.updateTask(this._task).subscribe((res) => {
      console.log(res);
    });

  }

  public open() {
    this._open(this.modalRef);
  }

  setTask(task: Task) {
      this._task = task;
      this._users = this._users.filter(user => this._task.responsible.findIndex(_userId => _userId == user._id) == -1);
      this.open();
  }

  update(user: User) {
    this._users.push(user);
  }

  getRoleForSpecificUser(user: User) {
    let role = this._roles.find(role => role.userID == user._id);
    let roleArray = RoleService.roleEnumToArray();

    return role ? roleArray[role.role] : null;
  }

}
