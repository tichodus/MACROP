import { Component } from '@angular/core';
import * as Socket from 'socket.io-client';
import { ProjectSubscriber } from './services/projectSubscriber.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private socket;
  constructor(private projectSubscriber: ProjectSubscriber) {
    this.socket = Socket('http://localhost:3000');
    this.socket.on('projectCreated', (data) => {
      this.projectSubscriber.update(data);
    });
  }
}
