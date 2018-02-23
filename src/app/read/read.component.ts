import { Component, OnInit } from '@angular/core';
import {Chapter} from '../chapter';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  chapters: Chapter[] = [];
  //commentaries: Comments[] = [];
  readMode: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.readMode = false;
  }

  isReadMode() {
    return this.readMode;
  }

  switchMode() {
    if (this.readMode === true) {
      this.readMode = false;
    } else {
      this.readMode = true;
    }
  }

}
