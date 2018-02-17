import { Component } from '@angular/core';
import * as Socket from 'socket.io-client';
import { ProjectSubscriber } from './services/projectSubscriber.service';
import { ChatSubscriber } from './services/chatSubscriber.service';
import { TaskSubscriber } from './services/taskSubscriber.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private socket;
  constructor(private taskSubscriber: TaskSubscriber, private projectSubscriber: ProjectSubscriber, private chatSubscriber: ChatSubscriber) {
    this.socket = Socket('https://macrop.herokuapp.com/');
    this.socket.on('projectCreated', (data) => {
      this.projectSubscriber.update(data);
    });
    this.socket.on('sentMessage', (data) => {
      console.log(data);
      this.chatSubscriber.update(data);
    });

    this.socket.on('taskUpdated', (data) => {
      this.taskSubscriber.update(data);
    })

    this.socket.on('taskCreated', (data) => {
      this.taskSubscriber.update(data);
    });
  }
}
