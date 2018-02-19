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
import {CheckboxModule, DataListModule, DropdownModule, OrderListModule} from 'primeng/primeng';
import { JwtInterceptor } from './interception/jwt.interceptor';
import {AuthenticationService} from './services/auth.service';
import {UsersService} from './services/users.service';
import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {InplaceModule} from 'primeng/inplace';
import { AdminComponent } from './admin/admin.component';
import {TableModule} from 'primeng/table';
import { UserCredentialsComponent } from './user-credentials/user-credentials.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: 'cabinet', component: UserCabinetComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'user/:email', component: UserCabinetComponent}
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
    UserCabinetComponent,
    AdminComponent,
    UserCredentialsComponent
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
    DataListModule,
    InplaceModule,
    TableModule,
    DropdownModule,
    CheckboxModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AuthenticationService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
