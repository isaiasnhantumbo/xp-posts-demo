import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {API_URL} from "../../environments/environment";
import {ILoginResponse} from "../models/login-response";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  signIn(email: string, password: string) {
    return this.http.post<ILoginResponse>(`${API_URL}/users/signin`, {email, password});
  }

  singUp(name: string,email: string, password: string) {
    return this.http.post(`${API_URL}/users/signup`, {name, email, password});
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token){
      return true;
    }
    return false;
  }
}
