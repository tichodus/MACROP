import { Component, OnInit } from '@angular/core';
import { UserSession } from '../../services/userSession.service';
import { UserSessionSubject } from '../../services/userSessionSubject.service';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private _isLogged: boolean;
  private _isProjectOpened: boolean;
  constructor(private userSessionSubject: UserSessionSubject, private router: Router, private activatedRoute: ActivatedRoute) {
    this._isProjectOpened = false;
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
    document.getElementById("main").style.marginLeft = '0';
    document.getElementById("main").className = 'no-transition';
    this.router.navigate(['login']);

  }
}
