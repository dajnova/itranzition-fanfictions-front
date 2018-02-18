import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.css']
})
export class UserCabinetComponent implements OnInit {
  username: string;
  constructor() { }

  ngOnInit() {
    this.username='string';
  }

}
