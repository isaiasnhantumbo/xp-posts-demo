import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PostsService} from "../../services/posts.service";
import {IPost} from "../../models/post";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  allPosts: IPost[] = [];

  constructor(private router: Router, private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
        if (data) {
          this.allPosts = data
        }
      });
  }

  ngOnDestroy() {
    console.log('Home destroyed');
  }

  gotoSignUp() {
    this.router.navigateByUrl("/signup");
  }

}
