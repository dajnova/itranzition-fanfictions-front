import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FanfictionsService {

  constructor(private http: HttpClient) { }

  getMyFanfictions(){
    return this.http.get('/api/fanfictions/my')
      .map(data => JSON.stringify(data));
  }

}
