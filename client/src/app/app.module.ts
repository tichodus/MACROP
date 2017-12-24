import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UsersService } from './services/users.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LogoComponent } from './components/logo/logo.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    LogoComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    // ALL THE ROUTES THAT ARE BEEN USED IN THE APPLICATION ARE CONFIGURED HERE
    RouterModule.forRoot([
      { path: '', component:LoginComponent,pathMatch:'full' },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      
    ])
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
