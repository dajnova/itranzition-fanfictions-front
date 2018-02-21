import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {Profile} from '../profile';
import {User} from '../user';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient, private router: Router) { }

  public getMe(){
    return this.http.get('/api/users/me')
      .map(data => JSON.stringify(data));
  }

  public updateMyProfile(user: Profile){
    return this.http.post('/api/users/me/update', user)
      .map(data => JSON.stringify(data));
  }

  public updateProfiles(users: Array<User>){
    return this.http.post('/api/users/update', users);
  }

  public deleteUsers(users: Array<User>){
    return this.http.post('/api/users/delete', users);
  }

  public getAll(){
    return this.http.get('/api/users/all')
      .map(data => JSON.stringify(data));
  }

}
