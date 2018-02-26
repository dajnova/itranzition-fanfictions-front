import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth.service';
import {Profile} from '../../models/profile';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.css']
})

export class AuthorizationFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  isAuthorized(): boolean {
    let currentUser = localStorage.getItem('currentUser');
    return currentUser && JSON.parse(currentUser).token;
  }

}
