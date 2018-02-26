import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private route: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const local = localStorage.getItem('currentUser');
    if (local && JSON.parse(local).token) {
      return true;
    } else {
      this.route.navigate(['/']);
      return false;
    }
  }
}
