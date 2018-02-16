import { Component, OnInit } from '@angular/core';
import {Profile} from '../profile';
import {AuthenticationService} from '../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msgs: Message[] = [];
  email: string;
  password: string;
  userform: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthenticationService) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }
  saveEmail(event: any) {
    this.email = event.target.value;
  }

  savePassword(event: any) {
    this.password = event.target.value;
  }

  onSubmit() {
    let user: Profile = {
      email: this.email,
      name: '',
      password: this.password,
    };
    this.auth.login(user);
  }

}
