import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Fanfiction} from '../fanfiction';
import {Chapter} from '../chapter';
import {HttpClient} from '@angular/common/http';
import {FanfictionsService} from '../services/fanfictions.service';
import {UsersService} from '../services/users.service';
import {UploadsService} from '../services/uploads.service';
import {Observable} from 'rxjs';
import {Message, SelectItem} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fanfic-edit',
  templateUrl: './fanfic-edit.component.html',
  styleUrls: ['./fanfic-edit.component.css']
})
export class FanficEditComponent implements OnInit {

  msgs: Message[] = [];
  fanfic: Fanfiction;
  availableTags: string[] = [];
  availableGenres: string[] = [];
  fanfictionId: any = '';
  userId: any;
  filteredTags: string[];
  filteredGenres: string[];
  visibleSidebar5: boolean;
  chapter: Chapter;

  constructor(private route: ActivatedRoute, private fanficService: FanfictionsService,
              private UsersService: UsersService, private uploadsService: UploadsService, private router: Router) { }

  ngOnInit() {
    this.fanfictionId = this.route.snapshot.paramMap.get('id');
    this.getTagsList();
    this.getGenreList();
    this.chapter = new Chapter();
    this.fanfic = new Fanfiction();
    this.fanfic.tags=[];
    this.fanfic.chapters = [];
    if (this.fanfictionId !== '') {
      this.getFanfiction();
    }
  }

  addChapter() {
    const chapter = new Chapter();
    chapter.title = 'New chapter';
    chapter.id = this.fanfic.chapters.length;
    this.fanfic.chapters.push(chapter);
  }

  redactChapter(id) {
    this.visibleSidebar5 = true;
    for (let i = 0; i < this.fanfic.chapters.length; i++) {
      if (this.fanfic.chapters[i].id === id) {
        this.chapter = this.fanfic.chapters[i];
        break;
      }
    }
  }

  filterGenre(event) {
    Observable.from(this.availableGenres)
      .filter(s => s.includes(event.query))
      .subscribe(s => this.filteredGenres.push(s));
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
    for (let i = 0; i < this.fanfic.chapters.length; i++) {
      if (this.fanfic.chapters[i].id === this.chapter.id) {
        this.fanfic.chapters[i] = this.chapter;
        this.visibleSidebar5 = false;
        break;
      }
    }
  }

  onRemove(event){
    this.fanfic.imageURL = '';
  }

  onRemoveCh(event){
    this.chapter.imageURL = '';
  }

  uploadImage(event) {
    this.uploadsService.uploadImage(event.files[0])
      .subscribe(data => {
        this.fanfic.imageURL = JSON.parse(data).imageURL;
        this.msgs.push({severity: 'info', summary: 'Success', detail: 'Image uploaded'});
      });
  }

  uploadImageCh(event) {
    this.uploadsService.uploadImage(event.files[0])
      .subscribe(data => {
        this.chapter.imageURL = JSON.parse(data).imageURL;
        this.msgs.push({severity: 'info', summary: 'Success', detail: 'Image uploaded'});
      });
  }

  deleteChapter(id) {
    for (let i = 0; i < this.fanfic.chapters.length; i++) {
      if (this.fanfic.chapters[i].id === id) {
        this.fanfic.chapters.splice(i,1);
        break;
      }
    }
  }

  getFanfiction(){
    this.UsersService.getMe()
    .subscribe(data => {
      this.userId = JSON.parse(data).id;
      this.fanficService.getFanfiction(this.fanfictionId, this.userId)
        .subscribe(data => {
          if(JSON.parse(data)){
            this.fanfic = JSON.parse(data);
          } else {
            this.fanfictionId = null;
          }
      });
    });
  }

  submitFanfic() {
    for (let i = 0; i < this.fanfic.chapters.length ; i++) {
      if (this.fanfic.chapters[i].textBlock === '') {
        this.fanfic.chapters.splice(i, 1);
      }
    }
    this.fanfic.tags = this.fanfic.tags.filter(this.onlyUnique);
    if(this.fanfictionId) {
      this.fanficService.updateFanfiction(this.fanfic)
        .subscribe(data => {
          this.success();
        });
    } else {
      this.fanficService.createFanfiction(this.fanfic, null)
        .subscribe(data => {
          this.success();
        });
    }
  }

  success(){
    alert("Submitted");
    this.router.navigate(['/cabinet']);
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getTagsList() {
    this.fanficService.getTagsList()
      .map(data => {
        let tags = [];
        for (let tagObj of JSON.parse(data)) {
          tags.push(tagObj.tag);
        }
        return tags;
      })
      .subscribe(data => this.availableTags = data);
  }

  getGenreList() {
    this.fanficService.getGenresList()
      .subscribe((data: string[]) => {
        this.availableGenres = data;
      });
  }
}
