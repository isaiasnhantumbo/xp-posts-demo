import { getPostsSuccess, getPostsFail } from './../actions/posts.actions';
import { PostsService } from './../../services/posts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getPosts } from '../actions/posts.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPosts),
      exhaustMap((action) =>
        this.postsService.getAllPosts().pipe(
          map((posts) => getPostsSuccess({ payload: posts })),
          catchError((error) => of(getPostsFail({ payload: error })))
        )
      )
    )
  );
}
