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
import { TaskService } from './services/task.services';
import { TaskSubscriber } from './services/taskSubscriber.service';
import { ChatComponentComponent } from './components/chat-component/chat-component.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { DragScrollModule } from 'ngx-drag-scroll';
import { DndModule } from 'ng2-dnd';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmptyTaskComponent } from './components/empty-task/empty-task.component';
import { ModalModule } from 'angular-custom-modal';
import { AddOrRemoveUserModalComponent } from './components/add-or-remove-user.modal/add-or-remove-user.modal.component';
import { AddUserToProjectModalComponent } from './components/add-user-to-project-modal/add-user-to-project-modal.component';
import { AddUserToTaskModalComponent } from './components/add-user-to-task-modal/add-user-to-task-modal.component';
import { UserReportComponent } from './components/user-report/user-report.component';
import { TeamReportComponent } from './components/team-report/team-report.component';
import { ProjectReportComponent } from './components/project-report/project-report.component';
import { ReportComponent } from './components/report/report.component';
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ReportService } from './services/report.service';
import { CreateTeamModalComponent } from './components/create-team-modal/create-team-modal.component';


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
    ProjectPanelComponent,
    ChatComponentComponent,
    SidebarComponent,
    EmptyTaskComponent,
    AddOrRemoveUserModalComponent,
    AddUserToProjectModalComponent,
    AddUserToTaskModalComponent,
    UserReportComponent,
    TeamReportComponent,
    ProjectReportComponent,
    ReportComponent,
    CreateTeamModalComponent,
  ],
  imports: [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ModalModule,
    DndModule.forRoot(),
    DragScrollModule,
    AngularDraggableModule,
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
      { path: 'userPanel', component: UserPanelComponent, pathMatch: 'full' },
      { path: 'newProject', component: NewProjectFormComponent, pathMatch: 'full' },
      { path: 'taskBoard/:id', component: TaskBoardComponent, pathMatch: 'full' },
      { path: 'report/:role', component: ReportComponent, pathMatch: 'full' },
    ])
  ],
  providers: [ReportService,TaskSubscriber, TaskService, UsersService, ProjectSubscriber, UserSessionSubject, RequestService, ProjectService, ChatSubscriber, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }


