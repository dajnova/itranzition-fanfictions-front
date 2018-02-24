import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {User} from '../user';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AdminGuard implements CanActivate {
  role: string;
  constructor(private http: HttpClient) { };
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.http.get('/api/users/me')
      .map(data => JSON.stringify(data)).subscribe(data => {
        this.role = JSON.parse(data).role;
      });
    if(this.role === 'ROLE_ADMIN') {
      return true;
    } else {
      return false;
    }
  }
}
