import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UsersService } from './services/users.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LogoComponent } from './components/logo/logo.component';
import { CollapseModule } from "ngx-bootstrap";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { UserSessionSubject } from './services/userSessionSubject.service';
import { BoardComponent } from './components/board/board.component';
import { RequestService } from './services/requestService.service';
import { ProjectService } from './services/project.service';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { NewProjectFormComponent } from './components/new-project-form/new-project-form.component';
import { ProjectSubscriber } from './services/projectSubscriber.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectPanelComponent } from './components/project-panel/project-panel.component';
import { ChatSubscriber } from './services/chatSubscriber.service';
import { ChatService } from './services/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    LogoComponent,
    SignUpComponent,
    UserPanelComponent,
    BoardComponent,
    TaskBoardComponent,
    NewProjectFormComponent,
    ProjectPanelComponent
  ],
  imports: [
    NgxPaginationModule,
    HttpModule,
    CollapseModule,
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    // ALL THE ROUTES THAT ARE BEEN USED IN THE APPLICATION ARE CONFIGURED HERE
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'signUp', component: SignUpComponent, pathMatch: 'full' },
      { path: 'userPanel', component: UserPanelComponent,pathMatch:'full' },
      { path: 'taskBoard/:id', component: TaskBoardComponent,pathMatch:'full' },
      { path: 'newProject', component: NewProjectFormComponent, pathMatch: 'full' }
    ])
  ],
  providers: [UsersService, ProjectSubscriber, UserSessionSubject, RequestService, ProjectService, ChatSubscriber, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }


