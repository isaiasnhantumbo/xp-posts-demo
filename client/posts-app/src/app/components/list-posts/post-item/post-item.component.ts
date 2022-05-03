import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { PostsService } from './../../../services/posts.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { IPost } from '../../../models/post';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
})
export class PostItemComponent implements OnInit {
  @Input()
  post!: IPost;
  constructor(
    private router: Router,
    public postService: PostsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
  handleDeletePost(postId: number | undefined): void {
    if (this.userService.isAuthenticated() && postId != null) {
      const token = localStorage.getItem('token') || '';
      this.postService.deletePost(postId, token).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }
  navigateToEditPost(postId: number | undefined): void {
    this.router.navigateByUrl(`/edit-post/${postId}`);
  }

}
