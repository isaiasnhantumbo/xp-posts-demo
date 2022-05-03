import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../environments/environment';
import { IPost } from '../models/post';

@Injectable()
export class PostsService {
  constructor(private http: HttpClient) {}
  post!: IPost;
  getAllPosts() {
    /* const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    };*/
    return this.http.get<IPost[]>(`${API_URL}/posts`);
  }
  isUserOwnerOfPost(authorId: number | undefined): boolean {
    const userId = Number(localStorage.getItem('userId'));
    if (authorId == userId) {
      return true;
    }

    return false;
  }
  deletePost(postId: number, token?: string) {
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    };
    const response = this.http.delete<IPost>(
      `${API_URL}/posts/${postId}`,
      options
    );

    return response;
  }
  getPostById<T>(postId: number, token: string) {
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    };
    const response = this.http.get<T>(`${API_URL}/posts/${postId}`, options);
    console.log(response);

    return response;
  }
  addPost(title: string, content: string, imageUrl: string, token?: string) {
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    };
    return this.http.post<IPost>(
      `${API_URL}/posts`,
      {
        title,
        content,
        imageUrl,
      },
      options
    );
  }
  editPost(
    postId: number,
    title: string,
    content: string,
    imageUrl: string,
    token?: string
  ) {
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    };
    return this.http.put<IPost>(
      `${API_URL}/posts/${postId}`,
      {
        title,
        content,
        imageUrl,
      },
      options
    );
  }
}
