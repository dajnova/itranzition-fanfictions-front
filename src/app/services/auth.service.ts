import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {Profile} from '../profile';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) { }

  public register(user: Profile){
    return this.http.post('/api/register', user)
      .map(data => JSON.stringify(data));
  }

  public login(user: Profile){
    return this.http.post('/api/login', user)
      .map(data => JSON.stringify(data));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
