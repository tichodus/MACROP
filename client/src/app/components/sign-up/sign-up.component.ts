import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Router} from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  validationError: boolean;
  userAlreadyExists: boolean;
  constructor(private usersService: UsersService, private router:Router) {
    this.validationError = false;
  }

  ngOnInit() {
  }

  validate(form: NgForm) {
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const repeatedPassword = form.value.repeatedPassword;

    if (!username || username == 'undefined' || !password || password == 'undefined' || !email || email == 'undefined' || !repeatedPassword || repeatedPassword == 'undefined')
      return false;
    if (password == repeatedPassword)
      return true;
    return false;

  }

  signUp(form: NgForm) {
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const repeatedPassword = form.value.repeatedPassword;

    if (!this.validate(form)) {
      this.validationError = true;
      this.userAlreadyExists = false;
      return;
    }

    this.validationError = false;
    let user: User = new User(username, password, email);
    this.usersService.register(user).subscribe(res => {
      if (res.json())
        this.userAlreadyExists = true;
      else {
        this.userAlreadyExists = false;
        this.router.navigate(['/login']);
      }
    });
  }

}
