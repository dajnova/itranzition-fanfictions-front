import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error-404',
  templateUrl: './error-404.component.html',
  styleUrls: ['./error-404.component.css']
})
export class Error404Component implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  redirectToMain(){
    this.route.navigate(['/']);
  }

}
