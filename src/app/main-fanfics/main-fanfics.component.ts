import { Component, OnInit } from '@angular/core';
import {FanfictionsService} from '../services/fanfictions.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Fanfiction} from '../fanfiction';

@Component({
  selector: 'app-main-fanfics',
  templateUrl: './main-fanfics.component.html',
  styleUrls: ['./main-fanfics.component.css']
})
export class MainFanficsComponent implements OnInit {

  fanfictions: Array<Fanfiction>;
  totalRecords: any;
  currentPage: number;
  order: string;
  tag: string;

  constructor(private fanfictionsService: FanfictionsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.order = this.router.url;
    this.tag = this.route.snapshot.paramMap.get('tag');
    this.currentPage = 0;
    this.getFanfictions(this.currentPage);
  }

  openFanfiction(id){
    this.router.navigate(['/read/' + id]);
  }

  paginate(event) {
    this.currentPage = event.page;
    this.getFanfictions(event.page);
    window.scrollTo(0,0);
  }

  getFanfictions(page){
    this.fanfictionsService.getAllFanfictions(page, this.order)
      .subscribe(data => {
        this.totalRecords = JSON.parse(data).totalRecords;
        this.fanfictions = JSON.parse(data).fanfictions;
      });
  }

}
