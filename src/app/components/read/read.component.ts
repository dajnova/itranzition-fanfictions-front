import { Component, OnInit } from '@angular/core';
import {Chapter} from '../../models/chapter';
import {ActivatedRoute, Router} from '@angular/router';
import {Fanfiction} from '../../models/fanfiction';
import {Rating} from '../../models/rating';
import {FanfictionsService} from '../../services/fanfictions.service';
import {RatingService} from '../../services/rating.service';
import { Comment } from '../../models/comment';
import {SafeHtmlPipe} from '../../assistance/dom-sanitizer.pipe';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {

  chapter: Chapter;
  // likes: Likes[]=[];
  // ratings: Ratings[]=[];
  readMode: boolean;
  fanfic: Fanfiction;
  value: number;
  rating: Rating;
  comment: Comment;
  id: string;

  constructor(private route: ActivatedRoute, private fanficService: FanfictionsService, private ratingService: RatingService) { }

  ngOnInit() {
    this.comment = new Comment();
    this.comment.text='';
    this.comment.author='';
    this.rating = new Rating();
    this.fanfic = new Fanfiction();
    this.id = this.route.snapshot.paramMap.get('id');
    this.readMode = false;
    this.rating.averageRate = 0;
    this.rating.myRate = 0;
    window.addEventListener('scroll', this.scrollPercentage, true);
    this.getFanfiction(this.id);
  }

  getChapterRating(){
    this.ratingService.getChapterRating(this.chapter.id)
      .subscribe(data => {
        this.rating = JSON.parse(data);
        console.log(this.rating.myRate);
      });
  }

  submit() {
    this.fanficService.addComment(this.comment, this.id)
      .subscribe(data => {});
  }

  emptyComment(){
    if(this.comment.text.length > 10) {
      return false;
    } else {
      return true;
    }
  }

  isRated() {
    if(this.rating.myRate > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  getFanfiction(id) {
    this.fanficService.getFanfiction(id, null)
      .subscribe(data => {
        this.fanfic = JSON.parse(data);
        this.chapter = this.fanfic.chapters[0];
        this.getChapterRating();
      });
  }

  isReadMode() {
    return this.readMode;
  }

  onRate(event){
    let rating = {rate: event.value};
    this.ratingService.setChapterRating(this.chapter.id, rating)
      .subscribe(data =>{
        alert("Rate submitted");
        this.getChapterRating();
      });
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

}
