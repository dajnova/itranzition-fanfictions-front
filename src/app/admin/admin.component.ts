import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import { User } from '../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList: Array<User>;
  selectedUser: User;

  constructor(private users: UsersService, private router: Router) { }

  ngOnInit() {
    this.getUsersList();
  }
  redirectionToCabinet(email: any) {
    this.router.navigate(['user/' + email]);
  }

  getUsersList() {
    this.userList = this.users.getAll();
  }

}
