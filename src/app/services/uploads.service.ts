import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadsService {

  constructor(private http: HttpClient) { }

  uploadImage(image){
    let formData = new FormData();
    formData.append("file", image, image.name);
    return this.http.post('/api/uploads/uploadImage', formData)
      .map(data => JSON.stringify(data));
  }

}
