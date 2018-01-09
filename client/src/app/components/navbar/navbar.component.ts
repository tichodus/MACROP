import { Component, OnInit } from '@angular/core';
import { UserSession } from '../../services/userSession.service';
import { UserSessionSubject } from '../../services/userSessionSubject.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private _isLogged: boolean;

  constructor(private userSessionSubject: UserSessionSubject, private router: Router) {
    this.isLogged();
  }

  isLogged() {
    this.userSessionSubject.user.asObservable().subscribe((user: User) => {
      if (UserSession.validate(user))
        this._isLogged = true;
      else
        this._isLogged = false;
    });
  }

  //TODO: Needs to be tested
  ngOnInit() {
    this.userSessionSubject.update();
  }

  logout() {
    window.localStorage.clear();
    this.userSessionSubject.update();
    this._isLogged = false;
    this.router.navigate(['login']);

  }
}
