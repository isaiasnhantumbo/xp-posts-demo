import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../../environments/environment";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  singUpData = {
    name: '',
    email: '',
    password: ''
  }
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSingUp () {
    this.userService.singUp(this.singUpData.name, this.singUpData.email, this.singUpData.password)
      .subscribe(data => {
        this.router.navigateByUrl("/signin");
      })
  }

}
