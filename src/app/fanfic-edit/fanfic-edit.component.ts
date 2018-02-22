import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Fanfiction} from '../fanfiction';
import {Chapter} from '../chapter';

@Component({
  selector: 'app-fanfic-edit',
  templateUrl: './fanfic-edit.component.html',
  styleUrls: ['./fanfic-edit.component.css']
})
export class FanficEditComponent implements OnInit {

  fanfic: Fanfiction;
  chapters: Array<Chapter>;
  tags: string[] = [];
  genre: string;
  availableTags: string[] = [];
  availableGenres: string[] = [];
  id: any = '';
  filteredTags: string[];
  filteredGenres: string[];


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getFanficInfo();
    this.getTagsList();
    this.getChaptersList();
    this.getGenreList();
  }

  getTagsList() {

  }

  getChaptersList() {

  }

  getGenreList() {

  }

  getFanficInfo() {

  }

  addChapter() {

  }

  submitChapter() {

  }

  submitFanfic() {

  }

  filterGenre(event) {
    this.filteredGenres = [];
    for (let i = 0; i < this.availableGenres.length; i++) {
      const genre = this.availableGenres[i];
      if (genre.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredGenres.push(genre);
      }
    }
  }

  filterTagsMultiple(event) {
    const query = event.query;
    const symbol = query.substr(query.length - 1);
    if ( symbol === ' ') {
          this.tags.push(query);
    } else {
      this.filteredTags = this.filterTag(query, this.availableTags);
    }
  }

  filterTag(query, tags: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < tags.length; i++) {
      const tag = this.availableTags[i];
      if (tag.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(tag);
      }
    }
    return filtered;
  }

  onUpload(event) {
    if(event) {

    }
  }

}
