import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {Message, SelectItem} from 'primeng/api';
import {Profile} from '../profile';
import {AuthenticationService} from '../services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.css']
})

export class UserCabinetComponent implements OnInit {

  msgs: Message[] = [];
  username: string;
  email: string;

  constructor(private users: UsersService, private route: ActivatedRoute, private auth: AuthenticationService) { }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
  }

  updateUsername() {
    const user: Profile = {email: '', username: this.username, password: ''};
    this.users.setMe(user)
      .subscribe((data) => this.msgs.push({severity: 'info', summary: 'Success', detail: 'Username updated'}),
                 (err) => this.msgs.push({severity: 'error', summary: 'Error', detail: 'This username is already in use'})
      );
  }

  saveUsername(event: any) {
    this.username = event.target.value;
  }

  getUsername() {

  }

  getFanfictions() {

  }

  filterByName() {

  }


  filterByGenre() {

  }
  logout() {
    this.auth.logout();
  }

}
