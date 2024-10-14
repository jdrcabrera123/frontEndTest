import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserClass } from './user-class';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = 'http://localhost:8090/api/users/';

  constructor(private http: HttpClient) {}

  //get all
  getAll(): Observable<UserClass[]> {
    return this.http.get<UserClass[]>(this.url + 'all');
  }

  // get user
  get(id: number): Observable<UserClass> {
    return this.http.get<UserClass>(this.url + id);
  }
}
