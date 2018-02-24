import { Component, OnInit } from '@angular/core';
import {Chapter} from '../chapter';
import {ActivatedRoute, Router} from '@angular/router';
import {Fanfiction} from '../fanfiction';
import {FanfictionsService} from '../services/fanfictions.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  chapters: Chapter[] = [];
  chapter: Chapter;
  // commentaries: Comments[] = [];
  // likes: Likes[]=[];
  // ratings: Ratings[]=[];
  readMode: boolean;
  fanfic: Fanfiction;

  constructor(private route: ActivatedRoute, private ficService: FanfictionsService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.readMode = false;
    this.fanfic = this.ficService.getFanficById(id);
    this.chapters = this.ficService.getChaptersByFanficId(id);
    this.chapter = this.chapters[0];
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
    this.chapter = this.chapters[event.page];
  }

  scrollPercentage() {
    const h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight ) * 100;
  }

}
