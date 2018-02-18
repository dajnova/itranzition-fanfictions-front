import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {Profile} from '../profile';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient, private router: Router) { }

  public getMe(){
    return this.http.get('/api/users/me');
  }

}
