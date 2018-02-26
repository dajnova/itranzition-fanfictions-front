import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class HttpInterceptor {

  constructor(private route: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === <number>401 && err.status === <number>403) {
            localStorage.clear();
            this.route.navigate(['/error']);
        }
        if(err.status === <number>404) {
          this.route.navigate(['error/404']);
        }
      }
    });
  }
}
