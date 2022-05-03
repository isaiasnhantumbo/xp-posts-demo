import { PostsService } from './../../services/posts.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  addPostData = {
    title: '',
    content: '',
    imageUrl: '',
  };
  constructor(
    private userService: UserService,
    private router: Router,
    private postService: PostsService
  ) {}

  ngOnInit(): void {}
  onSubmit(): void {
    if (this.userService.isAuthenticated()) {
      const token = localStorage.getItem('token') || '';
      this.postService
        .addPost(
          this.addPostData.title,
          this.addPostData.content,
          this.addPostData.imageUrl,
          token
        )
        .subscribe(() => {
          this.router.navigateByUrl('/home');
        });
    }
  }
}
