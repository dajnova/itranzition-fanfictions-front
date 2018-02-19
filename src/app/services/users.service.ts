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

  public setMe(user: Profile){
    return this.http.post('/api/users/me', user)
      .map(data => JSON.stringify(data));
  }

  public getAll(){
    return this.http.get('/api/users/all')
      .map(data => JSON.stringify(data));
  }

}
