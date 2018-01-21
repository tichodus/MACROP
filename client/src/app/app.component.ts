import { Component } from '@angular/core';
import * as Socket from 'socket.io-client';
import { ProjectSubscriber } from './services/projectSubscriber.service';
import { ChatSubscriber} from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private socket;
  constructor(private projectSubscriber: ProjectSubscriber, private chatSubscriber: ChatSubscriber) {
    this.socket = Socket('http://macrop.herokuapp.com/');
    this.socket.on('projectCreated', (data) => {
      this.projectSubscriber.update(data);
    });
    this.socket.on('chatMessage', (data) => {
      this.chatSubscriber.update(data);
    });
  }
}
