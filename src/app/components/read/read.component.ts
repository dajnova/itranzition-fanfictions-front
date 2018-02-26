import { Component, OnInit } from '@angular/core';
import {Chapter} from '../../models/chapter';
import {ActivatedRoute, Router} from '@angular/router';
import {Fanfiction} from '../../models/fanfiction';
import {FanfictionsService} from '../../services/fanfictions.service';
import { Comment } from '../../models/Comments';
import {SafeHtmlPipe} from '../../assistance/dom-sanitizer.pipe';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {

  chapter: Chapter;
   commentaries: Comment[] = [];
  // likes: Likes[]=[];
  // ratings: Ratings[]=[];
  readMode: boolean;
  fanfic: Fanfiction;
  value: number;

  constructor(private route: ActivatedRoute, private fanficService: FanfictionsService) { }

  ngOnInit() {
    this.chapter = new Chapter();
    this.fanfic = new Fanfiction();
    const id = this.route.snapshot.paramMap.get('id');
    this.readMode = false;
    this.value = 0;
    window.addEventListener('scroll', this.scrollPercentage, true);
    this.getFanfiction(id);
  }

  getFanfiction(id) {
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
    window.scrollTo(0, 0);
  }

  scrollPercentage() {
    const s = window.scrollY;
    const h = document.documentElement.clientHeight;
    const c = document.documentElement.scrollHeight;
    return (( s / (c - h)) * 100);
  }

  setWidth(value) {
    document.getElementById('readModeText').style.width = value;
  }

  setFont(value) {
    document.getElementById('readModeText').style.fontFamily = value;
  }

  setFontSize(value) {
    document.getElementById('readModeText').style.fontSize = value;
  }

}
