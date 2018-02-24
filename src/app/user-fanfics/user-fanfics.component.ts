import { Component, OnInit } from '@angular/core';
import {FanfictionsService} from '../services/fanfictions.service';
import {Fanfiction} from '../fanfiction';
import { OrderPipe } from 'ngx-order-pipe';
import {PaginatorModule} from 'primeng/paginator';
import {FilterPipe} from '../filter.pipe';
import {Router} from '@angular/router';

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
  currentPage: number;

  constructor(private fanfictionsService: FanfictionsService, private orderPipe: OrderPipe, private router: Router) {
    this.sortedFanfictionList = orderPipe.transform(this.fanfictionList, 'creationDate');
    this.currentPage = 0;
  }

  ngOnInit() {
    this.getFanfictions(this.currentPage);
  }

  paginate(event) {
    this.currentPage = event.page;
    this.getFanfictions(event.page);
  }

  setOrder(value: string){
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  getFanfictions(page){
    this.fanfictionsService.getMyFanfictions(page)
      .subscribe(data => {
        this.fanfictionList = JSON.parse(data).fanfictions;
        window.scrollTo(0,0);
        this.totalRecords = JSON.parse(data).totalRecords;
      });
  }

  editFanfiction(id){
    this.router.navigate(['/fanfiction/edit/' + id]);
  }

  deleteFanfiction(id){
    this.fanfictionsService.deleteFanfiction(id)
      .subscribe(data => {
        this.getFanfictions(this.currentPage);
      });
  }

  createFanfiction(){
    this.router.navigate(['/fanfiction/edit']);
  }

  openFanfiction(fanfiction: string){
    //this.router.navigate(['/fanfiction/edit']);
  }

}
