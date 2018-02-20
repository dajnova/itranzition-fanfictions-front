import { Component, OnInit } from '@angular/core';
import {FanfictionsService} from '../services/fanfictions.service';
import {Fanfiction} from '../fanfiction';

@Component({
  selector: 'app-user-fanfics',
  templateUrl: './user-fanfics.component.html',
  styleUrls: ['./user-fanfics.component.css']
})
export class UserFanficsComponent implements OnInit {

  fanfictionList: Array<Fanfiction>;

  constructor(private fanfictionsService: FanfictionsService) { }

  ngOnInit() {
    this.fanfictionsService.getMyFanfictions()
      .subscribe(data => {
        this.fanfictionList = JSON.parse(data);
      });
  }

}
