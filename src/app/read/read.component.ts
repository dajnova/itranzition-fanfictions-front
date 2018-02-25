import { Component, OnInit } from '@angular/core';
import {Chapter} from '../chapter';
import {ActivatedRoute, Router} from '@angular/router';
import {Fanfiction} from '../fanfiction';
import {FanfictionsService} from '../services/fanfictions.service';
import {SafeHtmlPipe} from '../dom-sanitizer.pipe';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {

  chapter: Chapter;
  // commentaries: Comments[] = [];
  // likes: Likes[]=[];
  // ratings: Ratings[]=[];
  readMode: boolean;
  fanfic: Fanfiction;

  constructor(private route: ActivatedRoute, private fanficService: FanfictionsService) { }

  ngOnInit() {
    this.chapter = new Chapter();
    this.fanfic = new Fanfiction();
    const id = this.route.snapshot.paramMap.get('id');
    this.readMode = false;
    this.fanfic.chapters = [];
    this.getFanfiction(id);
  }

  getFanfiction(id){
    this.fanficService.getFanfiction(id, null)
      .subscribe(data => {
        this.fanfic = JSON.parse(data);
        this.chapter = this.fanfic.chapters[0];
        console.log(this.fanfic.chapters[0].textBlock);
      });
  }

  isReadMode() {
    return this.readMode;
  }

  isAuthenticated() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && JSON.parse(currentUser).token) {
      return true;
    } else { return false; }
  }

  switchMode() {
    if (this.readMode === true) {
      this.readMode = false;
    } else {
      this.readMode = true;
    }
  }

  paginate(event) {
    this.chapter = this.fanfic.chapters[event.page];
    window.scrollTo(0,0);
  }

  scrollPercentage() {
    const h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight ) * 100;
  }

}
