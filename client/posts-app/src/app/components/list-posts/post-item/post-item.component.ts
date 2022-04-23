import {Component, Input, OnInit} from '@angular/core';
import {IPost} from "../../../models/post";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  @Input()
  post: IPost = new IPost();
  constructor() { }

  ngOnInit(): void {
  }

}
