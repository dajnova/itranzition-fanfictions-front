import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/auth.service';
import {Profile} from '../profile';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.css']
})
export class AuthorizationFormComponent implements OnInit {

  constructor(private auth: AuthenticationService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  isAuthorized(): boolean {
    const currentUser: any = localStorage.getItem('currentUser');
    if (JSON.parse(currentUser).token != null) {
      return true;
    } else {
      return false;
    }
  }

  gotoCabinet(){
    this.router.navigate(['/cabinet']);
  }

  logout() {
    this.auth.logout();
  }

}
