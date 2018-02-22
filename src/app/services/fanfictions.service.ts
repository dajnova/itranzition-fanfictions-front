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

  getPagesCount(){
    return this.http.get('/api/fanfictions/pages');
  }

}
