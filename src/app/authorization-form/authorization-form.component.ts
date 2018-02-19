import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/auth.service';
import {Profile} from '../profile';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.css']
})

export class AuthorizationFormComponent implements OnInit {

  username: any;

  constructor(private auth: AuthenticationService, private users: UsersService, private http: HttpClient, private router: Router) {
    if(this.isAuthorized())
      this.fetchUserProfile();
  }

  ngOnInit() {
  }

  isAuthorized(): boolean {
    let currentUser = localStorage.getItem('currentUser');
    return currentUser && JSON.parse(currentUser).token;
  }

  fetchUserProfile() {
    this.users.getMe()
      .subscribe(data => {
        this.username = JSON.parse(data).username;
      });
  }

  gotoCabinet(){
    this.router.navigate(['/cabinet']);
  }

  logout() {
    this.auth.logout();
  }

}
