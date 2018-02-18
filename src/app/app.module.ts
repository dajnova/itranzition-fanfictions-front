import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthorizationFormComponent } from './authorization-form/authorization-form.component';
import { MainComponent } from './main/main.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/components/common/messageservice';
import {GrowlModule} from 'primeng/growl';
import {PanelModule} from 'primeng/panel';
import {DataListModule, OrderListModule} from 'primeng/primeng';
import { JwtInterceptor } from './interception/jwt.interceptor';
import {AuthenticationService} from './services/auth.service';
import { HotFicsComponent } from './hot-fics/hot-fics.component';
import { FindFicsComponent } from './find-fics/find-fics.component';
import { FreshFicsComponent } from './fresh-fics/fresh-fics.component';
import { AdminComponent } from './admin/admin.component';
import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';

const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: 'fresh', component: FreshFicsComponent},
  { path: 'cabinet', component: UserCabinetComponent},
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    AuthorizationFormComponent,
    MainComponent,
    LoginComponent,
    RegistrationComponent,
    HotFicsComponent,
    FindFicsComponent,
    FreshFicsComponent,
    AdminComponent,
    UserCabinetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    TabViewModule,
    CardModule,
    PanelModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    GrowlModule,
    PanelModule,
    OrderListModule,
    DataListModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
