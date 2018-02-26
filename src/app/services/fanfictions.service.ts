import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FanfictionsService {

  constructor(private http: HttpClient) { }

  getMyFanfictions(page, email){
    let url = '/api/fanfictions/my?page=' + page;
    if(email) url += '&email=' + email;
    return this.http.get(url)
      .map(data => JSON.stringify(data));
  }

  getGenresList(){
    return this.http.get('/api/genres/all');
  }

  getTagsList(){
    return this.http.get('/api/fanfictions/tags')
      .map(data => JSON.stringify(data));
  }

  getFanfiction(fanfictionId, userEmail){
    let url = '/api/fanfictions/get/' + fanfictionId;
    if(userEmail) url += '?email=' + userEmail;
    return this.http.get(url)
      .map(data => JSON.stringify(data));
  }

  deleteFanfiction(fanfictionId){
    return this.http.post('/api/fanfictions/delete/' + fanfictionId, null)
      .map(data => JSON.stringify(data));
  }

  createFanfiction(fanfiction, email){
    let url = '/api/fanfictions/create';
    if(email) url += '?email=' + email;
    return this.http.post(url, fanfiction)
      .map(data => JSON.stringify(data));
  }

  updateFanfiction(fanfiction){
    return this.http.post('/api/fanfictions/update', fanfiction)
      .map(data => JSON.stringify(data));
  }

  getAllFanfictions(page, order){
    return this.http.get('/api/fanfictions' + order + '?page=' + page)
      .map(data => JSON.stringify(data));
  }

  addComment(comment, fanfictionId){
    return this.http.post('/api/comments/add?fanfictionId=' + fanfictionId, comment)
      .map(data => JSON.stringify(data));
  }


}
