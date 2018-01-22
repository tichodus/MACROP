import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { Chat } from '../../models/chat';

@Component({
  selector: 'app-project-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.css']
})
export class ProjectPanelComponent implements OnInit {
  user: User;
  messages: Array<Message>;
  chat: Chat;
  constructor() { }

  ngOnInit() {
  }

}
