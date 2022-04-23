import {Component, Input, OnInit} from '@angular/core';
import {IPost} from "../../models/post";

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  @Input()
  posts: IPost[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
