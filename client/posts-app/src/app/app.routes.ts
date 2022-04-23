import {Route} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {SignupComponent} from "./components/signup/signup.component";
import {SigninComponent} from "./components/signin/signin.component";
import {AddPostComponent} from "./components/add-post/add-post.component";
import {AuthGuardGuard} from "./guards/auth-guard.guard";

export const routes : Route[] = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'add-post', component: AddPostComponent, canActivate: [AuthGuardGuard]},
]
