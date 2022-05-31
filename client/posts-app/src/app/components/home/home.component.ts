import { Observable } from 'rxjs';
import { getPosts } from './../../store/actions/posts.actions';
import { IAppState } from './../../store/reducers/index';
import { Component, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { IPost } from '../../models/post';
import { select, Store } from '@ngrx/store';
import { selectAllPosts } from 'src/app/store/selectors/posts.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  allPosts: IPost[] = [];

  constructor(private router: Router, private store: Store<IAppState>) {}
  ngOnInit(): void {
    this.loadPost();
  }

  ngOnDestroy() {
    console.log('Home destroyed');
  }

  gotoSignUp() {
    this.router.navigateByUrl('/signup');
  }
  loadPost() {
    this.store.dispatch(getPosts());
    this.store.pipe(select(selectAllPosts)).subscribe({
      next: (data) => {
        this.allPosts = data;
      },
      error: (err) => {
        // todo: show
        alert(err);
      },
    });
  }
}
