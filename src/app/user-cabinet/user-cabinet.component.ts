import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {Message, SelectItem} from 'primeng/api';
import {Profile} from '../profile';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.css']
})

export class UserCabinetComponent implements OnInit {

  msgs: Message[] = [];
  password: string;

  constructor(private users: UsersService) { }

  ngOnInit() {
  }

  updateUsername(username){
    let user: Profile = {email: '', username: username, password: ''};
    this.users.setMe(user)
      .subscribe((data) => this.msgs.push({severity: 'info', summary: 'Success', detail: 'Username updated'}),
                 (err) => this.msgs.push({severity: 'error', summary: 'Error', detail: 'This username is already in use'})
      );
  }

  savePassword(event: any) {
    this.password = event.target.value;
  }

  updatePassword(){
    let user: Profile = {email: '', username: '', password: this.password};
    this.users.setMe(user)
    .subscribe((data) => this.msgs.push({severity: 'info', summary: 'Success', detail: 'Password updated'}),
               (err) => this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error'})
    );
  }

}
