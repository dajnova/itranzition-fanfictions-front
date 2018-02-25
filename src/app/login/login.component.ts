import { Component, OnInit } from '@angular/core';
import {Profile} from '../profile';
import {AuthenticationService} from '../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import { Response} from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msgs: Message[] = [];
  username: string;
  password: string;
  userform: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private translate: TranslateService) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }
  saveUsername(event: any) {
    this.username = event.target.value;
  }

  savePassword(event: any) {
    this.password = event.target.value;
  }

  onSubmit() {
    let user: Profile = {
      email: '',
      username: this.username,
      password: this.password,
    };
    this.auth.login(user)
      .subscribe((data) => localStorage.setItem('currentUser', data),
                 (err) => {
                   this.translate.get(err.error.message)
                      .subscribe(s => this.showMessage('error', 'Error', s))
                 }
      );
  }

  showMessage(severity, info, message){
    this.msgs = [];
    this.msgs.push({severity: severity, summary: info, detail: message});
  }

}
