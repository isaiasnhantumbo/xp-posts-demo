import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../models/post';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css'],
})
export class ListPostsComponent implements OnInit {
  @Input()
  posts: IPost[] = [];

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit(): void {}
  navigateToCreatePost(): void {
    this.router.navigateByUrl('/add-post');
  }

}
