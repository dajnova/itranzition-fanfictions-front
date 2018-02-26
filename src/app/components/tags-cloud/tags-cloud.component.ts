import { Component, OnInit } from '@angular/core';
import {CloudData, CloudOptions} from 'angular-tag-cloud-module';
import {FanfictionsService} from '../../services/fanfictions.service';
import {Tag} from '../../models/tag';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-tags-cloud',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.css']
})
export class TagsCloudComponent implements OnInit {

  options: CloudOptions = {
    width: 260,
    overflow: true
  };

  data: CloudData[] = [];
  tagsList :Tag[] = [];

  constructor(private fanficService: FanfictionsService) { }

  ngOnInit() {
    this.getTagsList();
  }

  compare(a: Tag, b: Tag) {
    if (a.weight < b.weight) {
      return 1;
    }
    if (a.weight > b.weight) {
      return -1;
    }
    return 0;
  }

  getTagsList() {
    this.fanficService.getTagsList()
      .subscribe(data => {
        let tags = JSON.parse(data);
        let newTags = [];
        for(let i = 0; i < tags.length; i++){
            let cloudData = {text: tags[i].tag, weight: tags[i].weight, link: '/fanfictions/' + tags[i].tag};
            newTags.push(cloudData);
        }
        this.data = newTags;
      });
  }

}
