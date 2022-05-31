import { IPost } from './../../models/post';
import { createAction, props } from '@ngrx/store';

export const getPosts = createAction('[Posts] Get All Posts');

export const getPostsFail = createAction(
  '[Posts] Get All Posts Fail',
  props<{ payload: any }>()
);
export const getPostsSuccess = createAction(
  '[Posts] Get All Posts Success',
  props<{ payload: IPost[] }>()
);
