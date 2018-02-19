import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {AuthenticationService} from '../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-credentials',
  templateUrl: './user-credentials.component.html',
  styleUrls: ['./user-credentials.component.css']
})
export class UserCredentialsComponent implements OnInit {

  username: any;

  constructor(private auth: AuthenticationService, private users: UsersService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchUserProfile();
  }

  gotoCabinet() {
    this.router.navigate(['/cabinet']);
  }

  logout() {
    this.auth.logout();
  }

  fetchUserProfile() {
    this.users.getMe()
      .subscribe(data => {
        this.username = JSON.parse(data).username;
      });
  }
}
