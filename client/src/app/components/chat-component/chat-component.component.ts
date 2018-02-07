import { Component, OnInit } from '@angular/core';
import { Chat } from '../../models/chat';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { Message } from '../../models/message';
import { User } from '../../models/user';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'chat',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponentComponent implements OnInit {
  private _isCollapsed: boolean;
  private _project: Project;
  private _messages: Array<Message>;
  private _users: Array<User>;
  private _userID: string;

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService, private chatService: ChatService) {
    this._isCollapsed = true;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.projectService.getProjectById(res.id).subscribe(project => {
        this._project = project.json();
        console.log(this._project);
      });

      this.chatService.getMessagesForProject(res.id).subscribe(res => {
        this._messages = res.json();
      })
    });

    this.activatedRoute.queryParams.subscribe(res => {
      this._userID = res.userID;
    })
  }

  chatCollapse() {
    this._isCollapsed = true;
  }
  chatExpand() {
    this._isCollapsed = false;
  }

  sendMessage(chatInput: HTMLInputElement, $event: KeyboardEvent) {
    if ($event.keyCode == 13) {
      let message: Message = new Message(this._userID, chatInput.value, this._project._id);
      this._messages.push(message);
      chatInput.value = '';
    }
  }
}