import { Component, OnInit } from '@angular/core';
import {FanfictionsService} from '../services/fanfictions.service';
import {Fanfiction} from '../fanfiction';
import { OrderPipe } from 'ngx-order-pipe';
import {PaginatorModule} from 'primeng/paginator';
import {FilterPipe} from '../filter.pipe';

@Component({
  selector: 'app-user-fanfics',
  templateUrl: './user-fanfics.component.html',
  styleUrls: ['./user-fanfics.component.css']
})

export class UserFanficsComponent implements OnInit {

  fanfictionList: Array<Fanfiction>;

  order: string = 'creationDate';
  reverse: boolean = false;
  sortedFanfictionList: Array<any>;
  totalRecords: any;

  constructor(private fanfictionsService: FanfictionsService, private orderPipe: OrderPipe) {
    this.sortedFanfictionList = orderPipe.transform(this.fanfictionList, 'creationDate');
    console.log(this.sortedFanfictionList);
  }

  ngOnInit() {
    this.getFanfictions(1);
    this.fanfictionsService.getPagesCount()
      .subscribe(data => this.totalRecords = data);
  }

  paginate(event) {
    this.getFanfictions(event.page);
  }

  setOrder(value: string) {
    if (this.order === value){
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  getFanfictions(page){
    this.fanfictionsService.getMyFanfictions(page)
      .subscribe(data => {
        this.fanfictionList = JSON.parse(data);
        window.scrollTo(0,0);
      });
  }

  openFanfiction(fanfiction: string){
    //this.router.navigate(['/fanfiction/edit']);
  }

}
