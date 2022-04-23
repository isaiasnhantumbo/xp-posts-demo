import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../../environments/environment";
import {IPost} from "../models/post";

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) { }

  getAllPosts() {
   /* const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    };*/
    return this.http.get<IPost[]>(`${API_URL}/posts`);
  }
}
