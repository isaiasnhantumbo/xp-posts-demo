import { reducers } from './store/reducers/index';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { PostsService } from './services/posts.service';
import { PostItemComponent } from './components/list-posts/post-item/post-item.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { PostsEffects } from './store/effects/posts.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    AddPostComponent,
    ListPostsComponent,
    PostItemComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([PostsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [UserService, AuthGuardGuard, PostsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
