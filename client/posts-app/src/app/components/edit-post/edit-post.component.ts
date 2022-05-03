import { ActivatedRoute, Route } from '@angular/router';
import { IPost } from './../../models/post';
import { PostsService } from './../../services/posts.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';

type IPostEditableData = Omit<IPost, 'dateCreated'>;
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  @Input()
  post: IPostEditableData = {
    content: '',
    id: 0,
    title: '',
    imageUrl: '',
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('token') || '';
    this.postService.getPostById<IPost>(postId, token).subscribe((post) => {
      this.post = post;
    });
  }
  handleEditPost(): void {
    if (this.userService.isAuthenticated()) {
      const token = localStorage.getItem('token') || '';
      this.postService
        .editPost(
          this.post.id,
          this.post.title,
          this.post.content,
          this.post.imageUrl,
          token
        )
        .subscribe(() => {
          this.router.navigateByUrl('/home');
        });
    }
  }
}
