import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/auth.service';
import {Profile} from '../profile';

@Component({
  selector: 'app-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.css']
})
export class AuthorizationFormComponent implements OnInit {

  constructor(auth: AuthenticationService) {
  }

  ngOnInit() {
  }

  isAuthorized(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      return true;
    } else {
      return false;
    }
  }

}
