import { IPostState } from './../reducers/post.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const postState = createFeatureSelector<IPostState>('post');

export const selectAllPosts = createSelector(postState, (state) => state.posts);
