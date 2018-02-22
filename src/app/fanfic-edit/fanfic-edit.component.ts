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
  chapters: Array<Chapter> = [];
  tags: string[] = [];
  genre: string;
  availableTags: string[] = [];
  availableGenres: string[] = [];
  id: any = '';
  filteredTags: string[];
  filteredGenres: string[];
  visibleSidebar5: boolean;
  chapter: Chapter;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTagsList();
    if (this.id !== '') {
      this.getChaptersList();
      this.getFanficInfo();
    }
    this.getGenreList();
    this.chapter = new Chapter();
    this.fanfic = new Fanfiction();
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
    let chapter = new Chapter();
    chapter.title = 'New chapter';
    if (this.chapters.length) {
      chapter.id = this.chapters[this.chapters.length - 1].id + 1;
    } else {
      chapter.id = 1;
    }
    this.chapters.push(chapter);
  }

  redactChapter(id) {
    this.visibleSidebar5 = true;
    for(var i=0;i<this.chapters.length;i++) {
      if(this.chapters[i].id===id) {
        this.chapter=this.chapters[i];
        break;
      }
    }
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
    this.filteredTags = [];
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
    if (event) {

    }
  }

}
