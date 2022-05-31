import { createReducer, on } from '@ngrx/store';
import { getPosts, getPostsFail, getPostsSuccess } from '../actions/posts.actions';
import { IPost } from './../../models/post';

export interface IPostState {
  posts: IPost[];
}

const initialState: IPostState = {
  posts: [],
};

export const postReducer = createReducer(
  initialState,
  on(getPosts, (state) => {
    return { ...state };
  }),
  on(getPostsSuccess, (state, { payload }) => {
    return { ...state, posts: payload };
  }),
  on(getPostsFail, (state, { payload }) => {
    return { ...state };
  })
);
