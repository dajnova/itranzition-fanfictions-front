import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Fanfiction} from '../fanfiction';
import {Chapter} from '../chapter';
import {HttpClient} from '@angular/common/http';
import {FanfictionsService} from '../services/fanfictions.service';

@Component({
  selector: 'app-fanfic-edit',
  templateUrl: './fanfic-edit.component.html',
  styleUrls: ['./fanfic-edit.component.css']
})
export class FanficEditComponent implements OnInit {

  fanfic: Fanfiction;
  chapters: Array<Chapter> = [];
  availableTags: string[] = [];
  availableGenres: string[] = [];
  id: any = '';
  filteredTags: string[];
  filteredGenres: string[];
  visibleSidebar5: boolean;
  chapter: Chapter;

  constructor(private route: ActivatedRoute, private fanficService: FanfictionsService) { }

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

  addChapter() {
    const chapter = new Chapter();
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
    for (let i = 0; i < this.chapters.length; i++) {
      if (this.chapters[i].id === id) {
        this.chapter = this.chapters[i];
        break;
      }
    }
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
          this.fanfic.tags.push(query);
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

  submit() {
    for (let i = 0; i < this.chapters.length; i++) {
      if (this.chapters[i].id === this.chapter.id) {
        this.chapters[i] = this.chapter;
        break;
      }
    }
  }

  onUpload(event) {
    if (event) {

    }
  }

  deleteChapter(id) {
    for (let i = 0; i < this.chapters.length; i++) {
      if (this.chapters[i].id === id) {
        this.chapters.splice(i,1);
        break;
      }
    }
  }



  getFanficInfo() {

  }

  submitFanfic() {
    for (let i = 0; i < this.chapters.length ; i++) {
      if (this.chapters[i].textblock === '') {
        this.chapters.splice(i, 1);
      }
    }
    this.fanfic.tags = this.fanfic.tags.filter(this.onlyUnique);
    if(this.id !== '') {
      this.fanficService.updateFanfic(this.id);
      this.fanficService.updateChapters(this.id);
    } else {
      this.fanficService.submitNewFanfic();
      this.fanficService.submitChapters();
    }
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getChaptersList() {

  }

  getTagsList() {
    this.fanficService.getTagsList()
      .subscribe(data => this.availableTags = JSON.parse(data));
  }

  getGenreList() {
    this.fanficService.getGenresList()
      .subscribe(data => this.availableTags = JSON.parse(data));
  }
}
