import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  singInData = {
    email: '',
    password: ''
  }
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignIn() {
    this.userService.signIn(this.singInData.email, this.singInData.password)
      .subscribe(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('email', data.email);
        localStorage.setItem('userId', data.userId.toString());
        this.router.navigateByUrl('/home');
      })
  }
}
