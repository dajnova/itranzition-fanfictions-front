import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FanfictionsService {

  constructor(private http: HttpClient) { }

  getMyFanfictions(page){
    return this.http.get('/api/fanfictions/my?page=' + page)
      .map(data => JSON.stringify(data));
  }

  getGenresList(){
    return this.http.get('/api/genres/all');
  }

  getTagsList(){
    return this.http.get('/api/fanfictions/tags')
      .map(data => JSON.stringify(data));
  }

  getFanfiction(fanfictionId, userId){
    let url = '/api/fanfictions/get/' + fanfictionId;
    if(userId) url += '?userId=' + userId;
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

}
