import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { IPostState, postReducer } from './post.reducer';

export interface IAppState {
  post: IPostState;
}

export const reducers: ActionReducerMap<IAppState> = {
  post: postReducer,
};

export const metaReducers: MetaReducer<IAppState>[] = !environment.production
  ? []
  : [];
