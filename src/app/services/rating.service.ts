import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RatingService {

  constructor(private http: HttpClient) { }

  getChapterRating(chapterId){
    return this.http.get('/api/rate/get?chapterId=' + chapterId)
      .map(data => JSON.stringify(data));
  }

  setChapterRating(chapterId, rating){
    return this.http.post('/api/rate/add?chapterId=' + chapterId, rating);
  }

}
