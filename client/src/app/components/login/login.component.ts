import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { UserSession } from '../../services/userSession.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { UserSessionSubject } from '../../services/userSessionSubject.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showLoginError: boolean = false;
  constructor(private usersService: UsersService, private router: Router,private userSessionSubject:UserSessionSubject) { }

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    let username = loginForm.value.username;
    let password = loginForm.value.password;

    let user: User = new User(username, password);
    this.usersService.login(user).subscribe(res => {
      let isLogged = UserSession.isValidResponse(res);
      let loggedUser: User = null;
      if (isLogged)
        loggedUser = res.json();
      if (UserSession.validate(loggedUser)) {
        UserSession.toLocalDataStorage(loggedUser);
        this.userSessionSubject.update();
        this.router.navigate(['userPanel']);
      }
      else {
        this.showLoginError = true;
      }
    });
  }

}
