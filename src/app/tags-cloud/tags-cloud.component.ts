import { Component, OnInit } from '@angular/core';
import {CloudData, CloudOptions} from 'angular-tag-cloud-module';
import {FanfictionsService} from '../services/fanfictions.service';
import {tag} from '../tag';

@Component({
  selector: 'app-tags-cloud',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.css']
})
export class TagsCloudComponent implements OnInit {

  options: CloudOptions = {
    width: 280,
    height: 400,
    overflow: true
  };

  data: CloudData[] = [];
  tagsList: tag[];


  constructor(private tags: FanfictionsService) { }

  ngOnInit() {
    /*this.tags.getTagsList()
      .subscribe(data => JSON.parse(this.tagsList = data));*/
    this.tagsList.sort(this.compare);
    for (let i = 0; i < 5; i++) {
      this.data[i] = {text: this.tagsList[i].tag, weight: this.tagsList[i].weight, link: 'tags/' + this.tagsList[i].tag, color: '#ffaaee'};
    }
  }

  compare(a: tag, b: tag) {
    if (a.weight < b.weight) {
      return 1;
    }
    if (a.weight > b.weight) {
      return -1;
    }
    return 0;
  }

}
