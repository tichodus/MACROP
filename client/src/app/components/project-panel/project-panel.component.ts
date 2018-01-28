import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { Chat } from '../../models/chat';
import { ChatSubscriber } from '../../services/chatSubscriber.service';
import { ChatService } from '../../services/chat.service';
import { UserSession } from '../../services/userSession.service';

@Component({
  selector: 'project-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.css']
})
export class ProjectPanelComponent implements OnInit {
  user: User;
  messages: Array<Message>;
  chat: Chat;
  constructor(private chatSubscriber : ChatSubscriber, private chatService : ChatService) { 
    this.user = <User>JSON.parse(UserSession.getUserFromStorage());
  }

  Func(){
    let otherId;
    this.chatService.getUserByUserId("5a2369ba959c240d0cd18037").subscribe(result => {
      otherId = result.json();
      console.log(otherId);
    });
    //let objects = this.chatService.getChatByForUserId(this.user._id, otherId._id).subscribe(res => {
      //console.log(res.json());
    //});
    
  }

  ngOnInit() {
  }

}
