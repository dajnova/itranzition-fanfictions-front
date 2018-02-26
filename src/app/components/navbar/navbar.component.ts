import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private icon = 'fa-moon-o';
  public browserLang = '';
  public dark = 'https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/cyborg/bootstrap.min.css';
  public light = 'https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.3/lumen/bootstrap.min.css';

  constructor(private router: Router, private translate: TranslateService, private auth: AuthenticationService, private http: HttpClient) {
    translate.setDefaultLang('en');
  }
  ngOnInit() {
    this.initLanguage();
    this.initStyle();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }

  initStyle() {
    if (localStorage.getItem('style') === null) {
      this.onChange();
    } else {
      this.changeStyle(localStorage.getItem('style'));
      this.icon = localStorage.getItem('icon');
    }
  }

  onChange() {
    if (localStorage.getItem('style') === this.dark || localStorage.getItem('style') === null) {
      localStorage.setItem('icon', 'fa-moon-o');
      this.changeStyle(this.light);
    } else {
      localStorage.setItem('icon', 'fa-sun-o');
      this.changeStyle(this.dark);
    }
    this.icon = localStorage.getItem('icon');
  }

  changeStyle(style) {
    style === 'null' ? style = this.dark : style = style;
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (link.href === this.dark || link.href === this.light) {
        localStorage.setItem('style', style);
        link.href = style;
      }
    }
  }

  initLanguage() {
    if (localStorage.getItem('lang') === null) {
      this.browserLang = this.translate.getBrowserLang();
      this.switchLanguage(this.browserLang.match(/en|ru/) ? this.browserLang : 'en');
    } else {
      this.browserLang = localStorage.getItem('lang');
      this.translate.use(this.browserLang);
    }
  }
}
