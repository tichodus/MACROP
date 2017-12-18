import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm) {
    let username = loginForm.value.username;
    let password = loginForm.value.password;

    let user: User = new User(username, password);
    this.usersService.login(user).subscribe(res => {
      if (res && res.json()) {
        let user = res.json();
        console.log("User logged "+ user.username+" "+user.email);
      }
      else
      console.log("User doesn't exist");
    });
    // let user = new User("micko", "micko123", "micko@elfak.rs");
    // this.usersService.register(user).subscribe(res => {
    //   console.log(res);
    // });
  }
}
