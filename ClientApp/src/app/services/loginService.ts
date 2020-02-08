import { Injectable } from "@angular/core";
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { users } from '../dtos/user';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {
  }

  postUser(user: users): Observable<any> {
  return this.httpClient.post("//localhost:3000/api/login", user);

}

getUserName():Observable<any> {
  return this.httpClient.get('http://localhost:3000/api/username');
}

isLoggedIn()
{
  return !!localStorage.getItem('token');
}

}